import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaBook, 
  FaLaptop, 
  FaBrain, 
  FaGlobe,
  FaFlask,
  FaHistory,
  FaLanguage,
  FaPalette,
  FaChurch,
  FaUniversity,
  FaRobot,
  FaFire,
  FaClock
} from 'react-icons/fa';
import api from '../services/api';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recentTopics, setRecentTopics] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      
      // Fetch all categories
      const categoriesRes = await api.get('/categories');
      setCategories(categoriesRes.data);

      // Fetch recent content (you can modify this endpoint)
      const recentRes = await api.get('/content/recent?limit=5');
      setRecentTopics(recentRes.data);

      // Fetch trending content (you can modify this endpoint)
      const trendingRes = await api.get('/content/trending?limit=5');
      setTrendingTopics(trendingRes.data);

    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Category icons mapping
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Computer Science': <FaLaptop className="text-2xl" />,
      'Philosophy': <FaBrain className="text-2xl" />,
      'Religion': <FaChurch className="text-2xl" />,
      'Social Science': <FaUniversity className="text-2xl" />,
      'Language': <FaLanguage className="text-2xl" />,
      'Science': <FaFlask className="text-2xl" />,
      'Technology': <FaLaptop className="text-2xl" />,
      'Arts': <FaPalette className="text-2xl" />,
      'Literature': <FaBook className="text-2xl" />,
      'History': <FaHistory className="text-2xl" />
    };
    return icons[categoryName] || <FaBook className="text-2xl" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section with Search */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Knowledge Library
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Explore 10 Disciplines • 50+ Subjects • 200+ Topics
          </motion.p>
          
          {/* Search Bar */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
          >
            <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any topic... (e.g., Algorithms, Plato, Quantum Physics)"
                className="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <FaSearch />
              </button>
            </div>
          </motion.form>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-8 mt-12 text-white"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">10</div>
              <div className="text-sm opacity-80">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm opacity-80">Topics</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid - Main Focus */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FaBook className="mr-3 text-blue-600" />
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link to={`/category/${category._id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
                  <div className="flex items-start justify-between">
                    <div className={`text-${category.color || 'blue-600'} bg-blue-50 p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      {getCategoryIcon(category.name)}
                    </div>
                    <span className="text-sm text-gray-400">{category.order}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2 group-hover:text-blue-600 transition">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 text-blue-600 text-sm font-medium flex items-center group-hover:translate-x-2 transition-transform">
                    Explore Collection 
                    <span className="ml-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Recent & Trending */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Topics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaClock className="mr-3 text-green-600" />
              Recently Added
            </h2>
            <div className="space-y-4">
              {recentTopics.length > 0 ? (
                recentTopics.map((topic, index) => (
                  <Link key={index} to={`/content/${topic._id}`}>
                    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition border-l-4 border-green-500">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{topic.theory?.substring(0, 100)}...</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>{topic.sectionId?.name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No recent topics</p>
              )}
            </div>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaFire className="mr-3 text-orange-600" />
              Popular Now
            </h2>
            <div className="space-y-4">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((topic, index) => (
                  <Link key={index} to={`/content/${topic._id}`}>
                    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition border-l-4 border-orange-500">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{topic.theory?.substring(0, 100)}...</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>{topic.sectionId?.name}</span>
                        <span className="mx-2">•</span>
                        <span>{topic.views || 0} views</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No trending topics</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <FaRobot className="text-3xl text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI Learning Assistant</h3>
                <p className="opacity-90">Ask me anything about any topic</p>
              </div>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition"
            >
              Chat Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quick Links by Category (Optional) */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.slice(0, 5).map((category) => (
            <Link key={category._id} to={`/category/${category._id}`}>
              <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition group">
                <div className="text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(category.name)}
                </div>
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;