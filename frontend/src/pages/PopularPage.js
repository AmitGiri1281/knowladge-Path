import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFire, FaEye, FaArrowRight } from 'react-icons/fa';
import api from '../services/api';

const PopularPage = () => {
  const [popularTopics, setPopularTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularTopics();
  }, []);

  const fetchPopularTopics = async () => {
    try {
      const res = await api.get('/content/trending?limit=20');
      setPopularTopics(res.data);
    } catch (error) {
      console.error('Error fetching popular topics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
        <FaFire className="mr-3 text-orange-600" /> Popular Topics
      </h1>
      <p className="text-xl text-gray-600 mb-8">Most viewed content in our knowledge base</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      ) : popularTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTopics.map((topic, index) => (
            <motion.div
              key={topic._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/content/${topic._id}`} aria-label={`View topic ${topic.title}`}>
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition border-l-4 border-orange-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-600 transition">
                        {topic.title || 'Untitled Topic'}
                      </h2>
                      <p className="text-gray-600 mb-3 line-clamp-3">
                        {topic.theory?.replace(/[#*`]/g, '') || 'No description available.'}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
                        <span className="bg-orange-100 px-2 py-1 rounded">
                          {topic.sectionId?.name || 'General'}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <FaEye className="mr-1" /> {topic.views || 0} views
                        </span>
                      </div>
                    </div>
                    <FaArrowRight className="text-orange-600 ml-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <FaFire className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No popular topics yet</h3>
          <p className="text-gray-500">Topics will appear here as users view them</p>
        </div>
      )}
    </div>
  );
};

export default PopularPage;