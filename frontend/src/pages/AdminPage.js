import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes,
  FaBook, FaVideo, FaFileAlt, FaQuestionCircle,
  FaArrowLeft, FaCheck, FaExclamationTriangle,
  FaSpinner, FaEye, FaEyeSlash
} from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    theory: '',
    notes: '',
    videoUrl: '',
    sectionId: '',
    order: 1,
    quiz: []
  });

  // Check authentication and admin status
  useEffect(() => {
    // For testing - you can change this condition
    // Option 1: Check for specific admin email
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Option 2: Allow any logged-in user for testing (remove in production)
    // Comment this out if you want only specific email
    /*
    if (user.email !== 'admin@example.com') {
      navigate('/');
      return;
    }
    */
    
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

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      
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
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Clear section selection when category changes
    setFormData({
      ...formData,
      sectionId: ''
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setErrorMessage('Title is required');
      return false;
    }
    if (!formData.theory.trim()) {
      setErrorMessage('Theory content is required');
      return false;
    }
    if (!formData.notes.trim()) {
      setErrorMessage('Notes are required');
      return false;
    }
    if (!formData.sectionId) {
      setErrorMessage('Please select a section');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      const contentData = {
        ...formData,
        createdAt: editingContent ? editingContent.createdAt : new Date().toISOString()
      };
      
      if (editingContent) {
        await api.put(`/content/${editingContent._id}`, contentData);
        setSuccessMessage('Content updated successfully!');
      } else {
        await api.post('/content', contentData);
        setSuccessMessage('Content added successfully!');
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
          quiz: []
        });
        setSelectedCategory('');
        fetchData(); // Refresh the list
        setSuccessMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving content:', error);
      setErrorMessage(error.response?.data?.message || 'Error saving content. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return;
    }
    
    try {
      setErrorMessage('');
      await api.delete(`/content/${id}`);
      setSuccessMessage('Content deleted successfully!');
      
      // Refresh the list
      fetchData();
      
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Error deleting content:', error);
      setErrorMessage(error.response?.data?.message || 'Error deleting content');
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
      quiz: content.quiz || []
    });
    
    // Set selected category based on content's section
    if (content.sectionId?.categoryId) {
      setSelectedCategory(content.sectionId.categoryId._id);
    }
    
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      theory: '',
      notes: '',
      videoUrl: '',
      sectionId: '',
      order: 1,
      quiz: []
    });
    setEditingContent(null);
    setSelectedCategory('');
    setErrorMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your knowledge base content</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center"
          >
            <FaCheck className="mr-2" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
          >
            <FaExclamationTriangle className="mr-2" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Content Button */}
      {!showForm && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Content
        </motion.button>
      )}

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
                {editingContent ? '✏️ Edit Content' : '➕ Add New Content'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category (Optional - filters sections)
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select a section</option>
                    {filteredSections.map(section => (
                      <option key={section._id} value={section._id}>
                        {section.name} {section.categoryId?.name ? `(${section.categoryId.name})` : ''}
                      </option>
                    ))}
                  </select>
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="e.g., Introduction to JavaScript"
                />
              </div>

              {/* Theory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theory (Markdown) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="theory"
                  value={formData.theory}
                  onChange={handleInputChange}
                  required
                  rows="8"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm"
                  placeholder="# Title\n\nYour content here...\n\n## Subheading\n- Bullet points\n- More content"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports Markdown: # Heading, **bold**, *italic*, - lists, etc.
                </p>
              </div>

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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Key points and summary notes..."
                />
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
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
                    resetForm();
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📚 Manage Content</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Total: {contents.length} items
          </span>
        </div>
        
        {contents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No content yet</h3>
            <p className="text-gray-500 mb-6">Click the "Add New Content" button to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contents.map((content, index) => (
              <motion.div
                key={content._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{content.title}</h3>
                      {content.videoUrl && (
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center">
                          <FaVideo className="mr-1" /> Video
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
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
                      <span>• Order: {content.order}</span>
                      <span>• Views: {content.views || 0}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {content.theory?.replace(/[#*`]/g, '').substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(content)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(content._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
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
      </div>
    </div>
  );
};

export default AdminPage;