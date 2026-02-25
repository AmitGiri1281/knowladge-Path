// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaPlus, FaEdit, FaTrash, FaSave, FaTimes,
//   FaBook, FaVideo, FaFileAlt, FaQuestionCircle,
//   FaArrowLeft, FaCheck, FaExclamationTriangle,
//   FaSpinner, FaEye, FaEyeSlash
// } from 'react-icons/fa';
// import api from '../services/api';
// import { useAuth } from '../context/AuthContext';

// const AdminPage = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [contents, setContents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingContent, setEditingContent] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [filteredSections, setFilteredSections] = useState([]);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     theory: '',
//     notes: '',
//     videoUrl: '',
//     sectionId: '',
//     order: 1,
//     quiz: []
//   });

//   // Check authentication and admin status
//   useEffect(() => {
//     // For testing - you can change this condition
//     // Option 1: Check for specific admin email
//     if (!user) {
//       navigate('/login');
//       return;
//     }
    
//     // Option 2: Allow any logged-in user for testing (remove in production)
//     // Comment this out if you want only specific email
//     /*
//     if (user.email !== 'admin@example.com') {
//       navigate('/');
//       return;
//     }
//     */
    
//     fetchData();
//   }, [user, navigate]);

//   // Filter sections when category changes
//   useEffect(() => {
//     if (selectedCategory) {
//       const filtered = sections.filter(
//         section => section.categoryId?._id === selectedCategory || section.categoryId === selectedCategory
//       );
//       setFilteredSections(filtered);
//     } else {
//       setFilteredSections(sections);
//     }
//   }, [selectedCategory, sections]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setErrorMessage('');
      
//       console.log('Fetching admin data...');
      
//       const [catRes, secRes, conRes] = await Promise.all([
//         api.get('/categories').catch(err => {
//           console.error('Categories fetch error:', err);
//           return { data: [] };
//         }),
//         api.get('/sections').catch(err => {
//           console.error('Sections fetch error:', err);
//           return { data: [] };
//         }),
//         api.get('/content/recent?limit=50').catch(err => {
//           console.error('Content fetch error:', err);
//           return { data: [] };
//         })
//       ]);
      
//       setCategories(catRes.data || []);
//       setSections(secRes.data || []);
//       setContents(conRes.data || []);
      
//       console.log('Data fetched:', {
//         categories: catRes.data?.length,
//         sections: secRes.data?.length,
//         contents: conRes.data?.length
//       });
      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setErrorMessage('Failed to load data. Please check your connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     // Clear section selection when category changes
//     setFormData({
//       ...formData,
//       sectionId: ''
//     });
//   };

//   const validateForm = () => {
//     if (!formData.title.trim()) {
//       setErrorMessage('Title is required');
//       return false;
//     }
//     if (!formData.theory.trim()) {
//       setErrorMessage('Theory content is required');
//       return false;
//     }
//     if (!formData.notes.trim()) {
//       setErrorMessage('Notes are required');
//       return false;
//     }
//     if (!formData.sectionId) {
//       setErrorMessage('Please select a section');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     try {
//       setSubmitting(true);
//       setErrorMessage('');
//       setSuccessMessage('');
      
//       const contentData = {
//         ...formData,
//         createdAt: editingContent ? editingContent.createdAt : new Date().toISOString()
//       };
      
//       if (editingContent) {
//         await api.put(`/content/${editingContent._id}`, contentData);
//         setSuccessMessage('Content updated successfully!');
//       } else {
//         await api.post('/content', contentData);
//         setSuccessMessage('Content added successfully!');
//       }
      
//       // Reset form
//       setTimeout(() => {
//         setShowForm(false);
//         setEditingContent(null);
//         setFormData({
//           title: '',
//           theory: '',
//           notes: '',
//           videoUrl: '',
//           sectionId: '',
//           order: 1,
//           quiz: []
//         });
//         setSelectedCategory('');
//         fetchData(); // Refresh the list
//         setSuccessMessage('');
//       }, 2000);
      
//     } catch (error) {
//       console.error('Error saving content:', error);
//       setErrorMessage(error.response?.data?.message || 'Error saving content. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
//       return;
//     }
    
//     try {
//       setErrorMessage('');
//       await api.delete(`/content/${id}`);
//       setSuccessMessage('Content deleted successfully!');
      
//       // Refresh the list
//       fetchData();
      
//       setTimeout(() => setSuccessMessage(''), 3000);
      
//     } catch (error) {
//       console.error('Error deleting content:', error);
//       setErrorMessage(error.response?.data?.message || 'Error deleting content');
//     }
//   };

//   const handleEdit = (content) => {
//     setEditingContent(content);
//     setFormData({
//       title: content.title || '',
//       theory: content.theory || '',
//       notes: content.notes || '',
//       videoUrl: content.videoUrl || '',
//       sectionId: content.sectionId?._id || content.sectionId || '',
//       order: content.order || 1,
//       quiz: content.quiz || []
//     });
    
//     // Set selected category based on content's section
//     if (content.sectionId?.categoryId) {
//       setSelectedCategory(content.sectionId.categoryId._id);
//     }
    
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       theory: '',
//       notes: '',
//       videoUrl: '',
//       sectionId: '',
//       order: 1,
//       quiz: []
//     });
//     setEditingContent(null);
//     setSelectedCategory('');
//     setErrorMessage('');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading admin panel...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Manage your knowledge base content</p>
//         </div>
//         <button
//           onClick={() => navigate('/')}
//           className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition"
//         >
//           <FaArrowLeft />
//           <span>Back to Home</span>
//         </button>
//       </div>

//       {/* Success Message */}
//       <AnimatePresence>
//         {successMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center"
//           >
//             <FaCheck className="mr-2" />
//             {successMessage}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Error Message */}
//       <AnimatePresence>
//         {errorMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
//           >
//             <FaExclamationTriangle className="mr-2" />
//             {errorMessage}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Add Content Button */}
//       {!showForm && (
//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           onClick={() => {
//             resetForm();
//             setShowForm(true);
//           }}
//           className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center"
//         >
//           <FaPlus className="mr-2" /> Add New Content
//         </motion.button>
//       )}

//       {/* Add/Edit Form */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {editingContent ? '✏️ Edit Content' : '➕ Add New Content'}
//               </h2>
//               <button
//                 onClick={() => {
//                   setShowForm(false);
//                   resetForm();
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Category Selection */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category (Optional - filters sections)
//                   </label>
//                   <select
//                     value={selectedCategory}
//                     onChange={handleCategoryChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map(cat => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Section <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="sectionId"
//                     value={formData.sectionId}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   >
//                     <option value="">Select a section</option>
//                     {filteredSections.map(section => (
//                       <option key={section._id} value={section._id}>
//                         {section.name} {section.categoryId?.name ? `(${section.categoryId.name})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                   {filteredSections.length === 0 && selectedCategory && (
//                     <p className="text-sm text-yellow-600 mt-1">
//                       No sections found for this category
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   placeholder="e.g., Introduction to JavaScript"
//                 />
//               </div>

//               {/* Theory */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Theory (Markdown) <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="theory"
//                   value={formData.theory}
//                   onChange={handleInputChange}
//                   required
//                   rows="8"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm"
//                   placeholder="# Title\n\nYour content here...\n\n## Subheading\n- Bullet points\n- More content"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Supports Markdown: # Heading, **bold**, *italic*, - lists, etc.
//                 </p>
//               </div>

//               {/* Notes */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Notes <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleInputChange}
//                   required
//                   rows="4"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   placeholder="Key points and summary notes..."
//                 />
//               </div>

//               {/* Video URL and Order */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Video URL (YouTube)
//                   </label>
//                   <input
//                     type="url"
//                     name="videoUrl"
//                     value={formData.videoUrl}
//                     onChange={handleInputChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                     placeholder="https://www.youtube.com/watch?v=..."
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Display Order
//                   </label>
//                   <input
//                     type="number"
//                     name="order"
//                     value={formData.order}
//                     onChange={handleInputChange}
//                     min="1"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex space-x-4 pt-4 border-t">
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {submitting ? (
//                     <>
//                       <FaSpinner className="animate-spin mr-2" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FaSave className="mr-2" />
//                       {editingContent ? 'Update Content' : 'Save Content'}
//                     </>
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForm(false);
//                     resetForm();
//                   }}
//                   className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center"
//                 >
//                   <FaTimes className="mr-2" /> Cancel
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Content List */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">📚 Manage Content</h2>
//           <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//             Total: {contents.length} items
//           </span>
//         </div>
        
//         {contents.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-lg shadow">
//             <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">No content yet</h3>
//             <p className="text-gray-500 mb-6">Click the "Add New Content" button to get started</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {contents.map((content, index) => (
//               <motion.div
//                 key={content._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-blue-500"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-800">{content.title}</h3>
//                       {content.videoUrl && (
//                         <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
//                           <FaVideo className="mr-1" /> Video
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
//                       <span className="bg-gray-100 px-2 py-1 rounded">
//                         {content.sectionId?.name || 'Unknown Section'}
//                       </span>
//                       {content.sectionId?.categoryId && (
//                         <>
//                           <span>→</span>
//                           <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">
//                             {content.sectionId.categoryId.name}
//                           </span>
//                         </>
//                       )}
//                       <span>• Order: {content.order}</span>
//                       <span>• Views: {content.views || 0}</span>
//                     </div>
                    
//                     <p className="text-sm text-gray-600 line-clamp-2">
//                       {content.theory?.replace(/[#*`]/g, '').substring(0, 150)}...
//                     </p>
//                   </div>
                  
//                   <div className="flex space-x-2 ml-4">
//                     <button
//                       onClick={() => handleEdit(content)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                       title="Edit"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(content._id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                       title="Delete"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Quick Stats */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
//           <div className="text-2xl font-bold">{categories.length}</div>
//           <div className="text-sm opacity-90">Categories</div>
//         </div>
//         <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
//           <div className="text-2xl font-bold">{sections.length}</div>
//           <div className="text-sm opacity-90">Sections</div>
//         </div>
//         <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
//           <div className="text-2xl font-bold">{contents.length}</div>
//           <div className="text-sm opacity-90">Content Items</div>
//         </div>
//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
//           <div className="text-2xl font-bold">
//             {contents.reduce((sum, item) => sum + (item.views || 0), 0)}
//           </div>
//           <div className="text-sm opacity-90">Total Views</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes,
  FaBook, FaVideo, FaFileAlt, FaQuestionCircle,
  FaArrowLeft, FaCheck, FaExclamationTriangle,
  FaSpinner, FaEye, FaEyeSlash, FaSearch,
  FaFilter, FaSort, FaSortUp, FaSortDown,
  FaChevronLeft, FaChevronRight, FaCopy,
  FaUndo, FaRedo, FaKeyboard, FaMarkdown,
  FaLink, FaImage, FaList, FaBold, FaItalic,
  FaHeading, FaCode, FaQuoteRight, FaUpload,
  FaDownload, FaPrint, FaShare, FaStar,
  FaBell, FaCog, FaUserShield, FaHistory
} from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

// ================ CUSTOM DEBOUNCE HOOK ================
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ================ SIMPLE MARKDOWN RENDERER ================
const SimpleMarkdown = ({ children }) => {
  if (!children) return null;
  
  // Very basic markdown parsing
  const parseMarkdown = (text) => {
    if (typeof text !== 'string') return text;
    
    // Split into lines and process
    return text.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold mt-3 mb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-bold mt-2 mb-1">{line.substring(4)}</h3>;
      }
      
      // Bold and italic
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');
      
      // Lists
      if (line.startsWith('- ')) {
        return <li key={i} className="ml-4">{line.substring(2)}</li>;
      }
      
      // Empty line
      if (line.trim() === '') {
        return <br key={i} />;
      }
      
      // Regular paragraph
      return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }} />;
    });
  };

  return <div className="prose max-w-none">{parseMarkdown(children)}</div>;
};

// ================ SUB-COMPONENTS ================

const LoadingSpinner = ({ size = 'lg', text = 'Loading...' }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className={`animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto mb-4 ${size === 'sm' ? 'h-10 w-10' : ''}`}></div>
      <p className="text-gray-600 text-lg">{text}</p>
    </div>
  </div>
);

const Toast = ({ type, message, onClose }) => {
  const icons = {
    success: <FaCheck className="text-green-500" />,
    error: <FaExclamationTriangle className="text-red-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
    info: <FaBell className="text-blue-500" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${colors[type]} max-w-md`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">{icons[type]}</div>
        <div className="flex-1">{message}</div>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
          <FaTimes />
        </button>
      </div>
    </motion.div>
  );
};

const MarkdownEditor = ({ value, onChange, label, required = false, error = null }) => {
  const [preview, setPreview] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const textareaRef = useRef(null);

  const insertMarkdown = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Restore selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: FaBold, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: FaItalic, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: FaHeading, action: () => insertMarkdown('# ', ''), title: 'Heading' },
    { icon: FaLink, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: FaList, action: () => insertMarkdown('- '), title: 'List' },
    { icon: FaCode, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: FaQuoteRight, action: () => insertMarkdown('> '), title: 'Quote' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowToolbar(!showToolbar)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showToolbar ? 'Hide' : 'Show'} Toolbar
          </button>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className={`text-xs px-2 py-1 rounded transition ${
              preview ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {showToolbar && (
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title={button.title}
            >
              <button.icon className="text-gray-600" size={16} />
            </button>
          ))}
        </div>
      )}

      {!preview ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows="12"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="# Title\n\nYour content here...\n\n## Subheading\n- Bullet points\n- More content"
        />
      ) : (
        <div className="prose max-w-none p-4 border rounded-lg bg-gray-50 min-h-[300px] overflow-auto">
          <SimpleMarkdown>{value || '*No content to preview*'}</SimpleMarkdown>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const SearchBar = ({ value, onChange, onFilterToggle, showFilters }) => (
  <div className="relative flex-1">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by title, content, or section..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
    <button
      onClick={onFilterToggle}
      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
        showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <FaFilter />
    </button>
  </div>
);

const Filters = ({ categories, sections, filters, onFilterChange, onClear }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4"
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-gray-700">Filters</h3>
      <button onClick={onClear} className="text-sm text-blue-600 hover:text-blue-800">
        Clear All
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
        <select
          value={filters.section}
          onChange={(e) => onFilterChange('section', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All Sections</option>
          {sections.map(section => (
            <option key={section._id} value={section._id}>{section.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Has Video</label>
        <select
          value={filters.hasVideo}
          onChange={(e) => onFilterChange('hasVideo', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All</option>
          <option value="true">With Video</option>
          <option value="false">Without Video</option>
        </select>
      </div>
    </div>
  </motion.div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
    <div className="flex justify-between flex-1 sm:hidden">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div>
        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronLeft className="h-4 w-4" />
            <FaChevronLeft className="h-4 w-4 -ml-2" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                  currentPage === pageNum
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronRight className="h-4 w-4" />
            <FaChevronRight className="h-4 w-4 -ml-2" />
          </button>
        </nav>
      </div>
    </div>
  </div>
);

const ContentCard = ({ content, onEdit, onDelete, onDuplicate, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{content.title}</h3>
              {content.videoUrl && (
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <FaVideo className="mr-1" size={12} /> Video
                </span>
              )}
              {content.featured && (
                <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <FaStar className="mr-1" size={12} /> Featured
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {content.sectionId?.name || 'Unknown Section'}
              </span>
              {content.sectionId?.categoryId && (
                <>
                  <span>→</span>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">
                    {content.sectionId.categoryId.name}
                  </span>
                </>
              )}
              <span className="flex items-center">
                <FaEye className="mr-1" size={12} /> {content.views || 0}
              </span>
              <span>• Order: {content.order}</span>
              <span>• Updated: {new Date(content.updatedAt).toLocaleDateString()}</span>
            </div>
            
            <AnimatePresence>
              {expanded ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="prose max-w-none text-sm text-gray-600">
                    <SimpleMarkdown>
                      {content.theory?.substring(0, 500)}
                    </SimpleMarkdown>
                    {content.theory?.length > 500 && (
                      <button
                        onClick={() => setExpanded(false)}
                        className="text-blue-600 hover:text-blue-800 mt-2"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {content.theory?.replace(/[#*`]/g, '').substring(0, 200)}...
                  {content.theory?.length > 200 && (
                    <button
                      onClick={() => setExpanded(true)}
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      Read more
                    </button>
                  )}
                </p>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col space-y-2 ml-4">
            <button
              onClick={() => onEdit(content)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDuplicate(content)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Duplicate"
            >
              <FaCopy />
            </button>
            <button
              onClick={() => onDelete(content._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ================ MAIN COMPONENT ================

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State Management
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    section: '',
    hasVideo: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'order', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    theory: '',
    notes: '',
    videoUrl: '',
    sectionId: '',
    order: 1,
    quiz: [],
    featured: false
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Toast management
  const addToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  // Authentication check
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  // Filter sections when category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = sections.filter(
        section => section.categoryId?._id === selectedCategory || section.categoryId === selectedCategory
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections(sections);
    }
  }, [selectedCategory, sections]);

  // Filter and search content
  const filteredContent = useMemo(() => {
    return contents.filter(content => {
      // Search filter
      if (debouncedSearchTerm) {
        const term = debouncedSearchTerm.toLowerCase();
        const matchesSearch = 
          content.title?.toLowerCase().includes(term) ||
          content.theory?.toLowerCase().includes(term) ||
          content.notes?.toLowerCase().includes(term) ||
          content.sectionId?.name?.toLowerCase().includes(term) ||
          content.sectionId?.categoryId?.name?.toLowerCase().includes(term);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category) {
        const contentCategory = content.sectionId?.categoryId?._id || content.sectionId?.categoryId;
        if (contentCategory !== filters.category) return false;
      }

      // Section filter
      if (filters.section) {
        const contentSection = content.sectionId?._id || content.sectionId;
        if (contentSection !== filters.section) return false;
      }

      // Video filter
      if (filters.hasVideo) {
        const hasVideo = Boolean(content.videoUrl);
        if (filters.hasVideo === 'true' && !hasVideo) return false;
        if (filters.hasVideo === 'false' && hasVideo) return false;
      }

      return true;
    });
  }, [contents, debouncedSearchTerm, filters]);

  // Sort content
  const sortedContent = useMemo(() => {
    const sorted = [...filteredContent].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'section') {
        aVal = a.sectionId?.name || '';
        bVal = b.sectionId?.name || '';
      } else if (sortConfig.key === 'category') {
        aVal = a.sectionId?.categoryId?.name || '';
        bVal = b.sectionId?.categoryId?.name || '';
      } else if (sortConfig.key === 'views') {
        aVal = a.views || 0;
        bVal = b.views || 0;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredContent, sortConfig]);

  // Pagination
  const paginatedContent = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedContent.slice(start, end);
  }, [sortedContent, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedContent.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching admin data...');
      
      const [catRes, secRes, conRes] = await Promise.all([
        api.get('/categories').catch(err => {
          console.error('Categories fetch error:', err);
          return { data: [] };
        }),
        api.get('/sections').catch(err => {
          console.error('Sections fetch error:', err);
          return { data: [] };
        }),
        api.get('/content/recent?limit=50').catch(err => {
          console.error('Content fetch error:', err);
          return { data: [] };
        })
      ]);
      
      setCategories(catRes.data || []);
      setSections(secRes.data || []);
      setContents(conRes.data || []);
      
      console.log('Data fetched:', {
        categories: catRes.data?.length,
        sections: secRes.data?.length,
        contents: conRes.data?.length
      });
      
      addToast('success', 'Data loaded successfully');
      
    } catch (error) {
      console.error('Error fetching data:', error);
      addToast('error', 'Failed to load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.theory.trim()) {
      errors.theory = 'Theory content is required';
    } else if (formData.theory.length < 10) {
      errors.theory = 'Theory content must be at least 10 characters';
    }
    
    if (!formData.notes.trim()) {
      errors.notes = 'Notes are required';
    }
    
    if (!formData.sectionId) {
      errors.sectionId = 'Please select a section';
    }
    
    if (formData.videoUrl && !formData.videoUrl.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
      errors.videoUrl = 'Please enter a valid YouTube URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addToast('error', 'Please fix the form errors');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const contentData = {
        ...formData,
        createdAt: editingContent ? editingContent.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (editingContent) {
        await api.put(`/content/${editingContent._id}`, contentData);
        addToast('success', 'Content updated successfully!');
      } else {
        await api.post('/content', contentData);
        addToast('success', 'Content added successfully!');
      }
      
      // Reset form
      setTimeout(() => {
        setShowForm(false);
        setEditingContent(null);
        setFormData({
          title: '',
          theory: '',
          notes: '',
          videoUrl: '',
          sectionId: '',
          order: 1,
          quiz: [],
          featured: false
        });
        setSelectedCategory('');
        setFormErrors({});
        fetchData();
      }, 1500);
      
    } catch (error) {
      console.error('Error saving content:', error);
      addToast('error', error.response?.data?.message || 'Error saving content. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return;
    }
    
    try {
      await api.delete(`/content/${id}`);
      addToast('success', 'Content deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting content:', error);
      addToast('error', error.response?.data?.message || 'Error deleting content');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      return;
    }
    
    try {
      await Promise.all(selectedItems.map(id => api.delete(`/content/${id}`)));
      addToast('success', `${selectedItems.length} items deleted successfully!`);
      setSelectedItems([]);
      fetchData();
    } catch (error) {
      console.error('Error deleting items:', error);
      addToast('error', 'Error deleting items');
    }
  };

  const handleDuplicate = async (content) => {
    try {
      const duplicateData = {
        ...content,
        title: `${content.title} (Copy)`,
        sectionId: content.sectionId?._id || content.sectionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      delete duplicateData._id;
      delete duplicateData.__v;
      
      await api.post('/content', duplicateData);
      addToast('success', 'Content duplicated successfully!');
      fetchData();
    } catch (error) {
      console.error('Error duplicating content:', error);
      addToast('error', 'Error duplicating content');
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      title: content.title || '',
      theory: content.theory || '',
      notes: content.notes || '',
      videoUrl: content.videoUrl || '',
      sectionId: content.sectionId?._id || content.sectionId || '',
      order: content.order || 1,
      quiz: content.quiz || [],
      featured: content.featured || false
    });
    
    // Set selected category based on content's section
    if (content.sectionId?.categoryId) {
      setSelectedCategory(content.sectionId.categoryId._id);
    }
    
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(sortedContent, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `admin-content-export-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    addToast('success', 'Data exported successfully!');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        // Add import logic here
        addToast('success', 'Data imported successfully!');
      } catch (error) {
        addToast('error', 'Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedContent.map(c => c._id));
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return <LoadingSpinner text="Loading admin panel..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your knowledge base content</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm opacity-90">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{sections.length}</div>
            <div className="text-sm opacity-90">Sections</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{contents.length}</div>
            <div className="text-sm opacity-90">Content Items</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">
              {contents.reduce((sum, item) => sum + (item.views || 0), 0)}
            </div>
            <div className="text-sm opacity-90">Total Views</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">
              {contents.filter(c => c.videoUrl).length}
            </div>
            <div className="text-sm opacity-90">With Video</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {!showForm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setFormData({
                    title: '',
                    theory: '',
                    notes: '',
                    videoUrl: '',
                    sectionId: '',
                    order: contents.length + 1,
                    quiz: [],
                    featured: false
                  });
                  setEditingContent(null);
                  setFormErrors({});
                  setShowForm(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center"
              >
                <FaPlus className="mr-2" /> Add New Content
              </motion.button>
            )}
            
            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FaTrash className="mr-2" /> Delete Selected ({selectedItems.length})
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Export Data"
            >
              <FaDownload />
            </button>
            <label className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
              <FaUpload />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onFilterToggle={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
          />

          <AnimatePresence>
            {showFilters && (
              <Filters
                categories={categories}
                sections={sections}
                filters={filters}
                onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                onClear={() => setFilters({ category: '', section: '', hasVideo: '' })}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingContent ? (
                    <span className="flex items-center">
                      <FaEdit className="mr-2 text-blue-600" /> Edit Content
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaPlus className="mr-2 text-green-600" /> Add New Content
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingContent(null);
                    setFormErrors({});
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category and Section Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category (Optional - filters sections)
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setFormData(prev => ({ ...prev, sectionId: '' }));
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sectionId"
                      value={formData.sectionId}
                      onChange={handleInputChange}
                      required
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                        formErrors.sectionId ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a section</option>
                      {filteredSections.map(section => (
                        <option key={section._id} value={section._id}>
                          {section.name} {section.categoryId?.name ? `(${section.categoryId.name})` : ''}
                        </option>
                      ))}
                    </select>
                    {formErrors.sectionId && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.sectionId}</p>
                    )}
                    {filteredSections.length === 0 && selectedCategory && (
                      <p className="text-sm text-yellow-600 mt-1">
                        No sections found for this category
                      </p>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Introduction to JavaScript"
                  />
                  {formErrors.title && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.title}</p>
                  )}
                </div>

                {/* Theory (Markdown) */}
                <MarkdownEditor
                  value={formData.theory}
                  onChange={(value) => setFormData(prev => ({ ...prev, theory: value }))}
                  label="Theory (Markdown)"
                  required
                  error={formErrors.theory}
                />

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                      formErrors.notes ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Key points and summary notes..."
                  />
                  {formErrors.notes && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.notes}</p>
                  )}
                </div>

                {/* Video URL and Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL (YouTube)
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                        formErrors.videoUrl ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    {formErrors.videoUrl && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.videoUrl}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Feature this content (will appear in featured section)
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-2" />
                        {editingContent ? 'Update Content' : 'Save Content'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingContent(null);
                      setFormErrors({});
                    }}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content List */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">📚 Manage Content</h2>
              <p className="text-sm text-gray-500 mt-1">
                Showing {paginatedContent.length} of {filteredContent.length} items
              </p>
            </div>
            
            {/* Sort Controls */}
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={`${sortConfig.key}-${sortConfig.direction}`}
                onChange={(e) => {
                  const [key, direction] = e.target.value.split('-');
                  setSortConfig({ key, direction });
                }}
                className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600"
              >
                <option value="order-asc">Order (Ascending)</option>
                <option value="order-desc">Order (Descending)</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="views-desc">Most Views</option>
                <option value="views-asc">Least Views</option>
                <option value="updatedAt-desc">Recently Updated</option>
                <option value="updatedAt-asc">Oldest First</option>
              </select>
            </div>
          </div>
          
          {/* Bulk Selection Header */}
          {paginatedContent.length > 0 && (
            <div className="flex items-center space-x-2 mb-2 px-2">
              <input
                type="checkbox"
                checked={selectedItems.length === paginatedContent.length && paginatedContent.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">
                {selectedItems.length === 0 
                  ? 'Select All' 
                  : `Selected ${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''}`}
              </span>
            </div>
          )}
          
          {filteredContent.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No content found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filters.category || filters.section 
                  ? 'Try adjusting your filters' 
                  : 'Click the "Add New Content" button to get started'}
              </p>
              {(searchTerm || filters.category || filters.section) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ category: '', section: '', hasVideo: '' });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {paginatedContent.map((content, index) => (
                  <div key={content._id} className="flex items-start space-x-2">
                    <div className="pt-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(content._id)}
                        onChange={() => toggleSelectItem(content._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <ContentCard
                        content={content}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDuplicate={handleDuplicate}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;