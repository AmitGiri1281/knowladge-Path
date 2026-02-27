import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [sections, setSections] = useState([]);
  const [sectionsWithContent, setSectionsWithContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
        // Fetch category details
        const categoryRes = await api.get(`/categories/${id}`);
        setCategory(categoryRes.data);
        
        // Fetch sections for this category
        const sectionsRes = await api.get(`/sections/category/${id}`);
        const allSections = sectionsRes.data;
        setSections(allSections);
        
        // Check each section for content
        const sectionsWithContentData = await Promise.all(
          allSections.map(async (section) => {
            try {
              const contentRes = await api.get(`/content/section/${section._id}`);
              return {
                ...section,
                hasContent: contentRes.data.length > 0,
                contentCount: contentRes.data.length
              };
            } catch (error) {
              return { ...section, hasContent: false, contentCount: 0 };
            }
          })
        );
        
        setSectionsWithContent(sectionsWithContentData.filter(s => s.hasContent));
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Category not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-xl opacity-90">{category.description}</p>
      </motion.div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionsWithContent.length > 0 ? (
          sectionsWithContent.map((section) => (
            <motion.div
              key={section._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/section/${section._id}`}>
                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{section.name}</h3>
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {section.contentCount} {section.contentCount === 1 ? 'topic' : 'topics'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="text-blue-600 text-sm font-medium">
                    Explore Section →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          // Show this when no sections have content
          <div className="col-span-full text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <FaBook className="text-6xl text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Content Available</h2>
              <p className="text-gray-600 mb-6">
                This category doesn't have any sections with content yet. 
                But don't worry! You can explore our external resources.
              </p>
              
              {/* External Resources Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Check out these external resources:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/resources/books"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <span className="text-2xl block mb-2">📚</span>
                    <span className="font-medium text-gray-700">External eBooks</span>
                  </Link>
                  <Link
                    to="/resources/journals"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <span className="text-2xl block mb-2">📓</span>
                    <span className="font-medium text-gray-700">External Journals</span>
                  </Link>
                  <Link
                    to="/resources/jobs"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <span className="text-2xl block mb-2">💼</span>
                    <span className="font-medium text-gray-700">Job Listings</span>
                  </Link>
                  <Link
                    to="/resources/conferences"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <span className="text-2xl block mb-2">🎤</span>
                    <span className="font-medium text-gray-700">Conferences</span>
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  These are external resources and will open in new tabs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* If there are some sections but they're empty, show a note */}
      {sections.length > 0 && sectionsWithContent.length === 0 && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-center">
            ⚠️ This category has {sections.length} section(s) but no content yet. 
            Check out our <Link to="/resources" className="text-blue-600 underline">External Resources</Link> for learning materials.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;