import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaArrowRight, FaRegClock } from 'react-icons/fa';
import api from '../services/api';

const RecentPage = () => {
  const [recentTopics, setRecentTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTopics();
  }, []);

  const fetchRecentTopics = async () => {
    try {
      const res = await api.get('/content/recent?limit=20');
      setRecentTopics(res.data);
    } catch (error) {
      console.error('Error fetching recent topics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton loader for multiple items
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 h-24 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
        <FaClock className="mr-3 text-green-600" /> Recently Added Topics
      </h1>
      <p className="text-xl text-gray-600 mb-6">
        The latest content added to our knowledge base
      </p>

      {recentTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTopics.map((topic, index) => (
            <motion.div
              key={topic._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/content/${topic._id}`} aria-label={`View ${topic.title}`}>
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition border-l-4 border-green-500 hover:border-green-600">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition">
                        {topic.title}
                      </h2>
                      <p className="text-gray-600 mb-3 line-clamp-3">
                        {topic.theory?.replace(/[#*`]/g, '').substring(0, 250)}...
                      </p>
                      <div className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
                        <span className="bg-green-100 px-2 py-1 rounded">
                          {topic.sectionId?.name || 'General'}
                        </span>
                        <span className="flex items-center">
                          <FaRegClock className="mr-1" />
                          {new Date(topic.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <FaArrowRight className="text-green-600 ml-4 mt-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <FaClock className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No recent topics</h3>
          <p className="text-gray-500">Topics will appear here once you add them</p>
        </div>
      )}
    </div>
  );
};

export default RecentPage;