import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBook, FaLaptop, FaBrain, FaGlobe, FaFlask, 
  FaHistory, FaLanguage, FaPalette, FaChurch, 
  FaUniversity, FaArrowRight 
} from 'react-icons/fa';
import api from '../services/api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (name) => {
    const icons = {
      'Computer Science': <FaLaptop className="text-3xl" />,
      'Philosophy': <FaBrain className="text-3xl" />,
      'Religion': <FaChurch className="text-3xl" />,
      'Social Science': <FaUniversity className="text-3xl" />,
      'Language': <FaLanguage className="text-3xl" />,
      'Science': <FaFlask className="text-3xl" />,
      'Technology': <FaLaptop className="text-3xl" />,
      'Arts': <FaPalette className="text-3xl" />,
      'Literature': <FaBook className="text-3xl" />,
      'History': <FaHistory className="text-3xl" />
    };
    return icons[name] || <FaBook className="text-3xl" />;
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
      <h1 className="text-4xl font-bold text-gray-800 mb-4">All Categories</h1>
      <p className="text-xl text-gray-600 mb-8">Explore all 10 disciplines of knowledge</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/category/${category._id}`}>
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-600 transition">
                    <div className="text-blue-600 group-hover:text-white text-3xl">
                      {getCategoryIcon(category.name)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">#{category.order}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
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