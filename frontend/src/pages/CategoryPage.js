import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const [categoryRes, sectionsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/categories/${id}`),
        axios.get(`http://localhost:5000/api/sections/category/${id}`)
      ]);
      
      setCategory(categoryRes.data);
      setSections(sectionsRes.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!category) {
    return <div className="text-center text-red-600">Category not found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-xl opacity-90">{category.description}</p>
      </motion.div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/section/${section._id}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                <img 
                  src={section.thumbnail || 'https://via.placeholder.com/400x200'} 
                  alt={section.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.name}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">Start Learning →</span>
                    <span className="text-sm text-gray-500">12 topics</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {sections.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-xl">No sections available yet.</p>
          <p className="mt-2">Check back soon for new content!</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;