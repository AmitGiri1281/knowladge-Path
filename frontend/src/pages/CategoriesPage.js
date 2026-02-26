import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBook, FaLaptop, FaBrain, FaGlobe, FaFlask, 
  FaHistory, FaLanguage, FaPalette, FaChurch, 
  FaUniversity, FaArrowRight 
} from 'react-icons/fa';
import api from '../services/api';

const iconMap = {
  'Computer Science': FaLaptop,
  'Philosophy': FaBrain,
  'Library and Information Science': FaChurch,
  'Social Science': FaUniversity,
  'Language': FaLanguage,
  'Science': FaFlask,
  'Technology': FaLaptop,
  'Arts': FaPalette,
  'Literature': FaBook,
  'History': FaHistory
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (name, className) => {
    const IconComponent = iconMap[name] || FaBook;
    return <IconComponent className={className} />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (categories.length === 0) {
    return <p className="text-center text-gray-600">No categories available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">All Categories</h1>
      <p className="text-xl text-gray-600 mb-8">Explore all disciplines of knowledge</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/category/${category._id}`} aria-label={`Explore ${category.name}`}>
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-600 transition">
                    {getCategoryIcon(category.name, 'text-blue-600 group-hover:text-white text-3xl')}
                  </div>
                  <span className="text-sm text-gray-400">#{category.order}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition">
                  Explore Category <FaArrowRight className="ml-2 group-hover:translate-x-2 transition" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;