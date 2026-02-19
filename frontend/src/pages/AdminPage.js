import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes,
  FaBook, FaVideo, FaFileAlt, FaQuestionCircle
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
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    theory: '',
    notes: '',
    videoUrl: '',
    sectionId: '',
    order: 1,
    quiz: []
  });
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    // Check if user is admin (you'll need to add isAdmin field)
    if (!user || user.email !== 'admin@example.com') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [catRes, secRes, conRes] = await Promise.all([
        api.get('/categories'),
        api.get('/sections'),
        api.get('/content/recent?limit=50')
      ]);
      setCategories(catRes.data);
      setSections(secRes.data);
      setContents(conRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContent) {
        await api.put(`/content/${editingContent._id}`, formData);
        alert('Content updated successfully!');
      } else {
        await api.post('/content', formData);
        alert('Content added successfully!');
      }
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
      fetchData();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await api.delete(`/content/${id}`);
        alert('Content deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('Error deleting content');
      }
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      theory: content.theory,
      notes: content.notes,
      videoUrl: content.videoUrl || '',
      sectionId: content.sectionId?._id || '',
      order: content.order,
      quiz: content.quiz || []
    });
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Add Content Button */}
      <button
        onClick={() => {
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
          setShowForm(!showForm);
        }}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
      >
        <FaPlus className="mr-2" /> Add New Content
      </button>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            {editingContent ? 'Edit Content' : 'Add New Content'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                name="sectionId"
                value={formData.sectionId}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select a section</option>
                {sections.map(section => (
                  <option key={section._id} value={section._id}>
                    {section.name} ({section.categoryId?.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theory (Markdown supported)
              </label>
              <textarea
                name="theory"
                value={formData.theory}
                onChange={handleInputChange}
                required
                rows="6"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600 font-mono"
                placeholder="# Title&#10;&#10;Your content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="Key points and notes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (YouTube)
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Content List */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Content</h2>
      <div className="space-y-4">
        {contents.map(content => (
          <div key={content._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{content.title}</h3>
                <p className="text-sm text-gray-500">
                  {content.sectionId?.name} • Order: {content.order}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(content)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;