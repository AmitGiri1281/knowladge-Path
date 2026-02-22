import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaClock,
  FaArrowRight,
  FaStar,
  FaGraduationCap,
  FaChartLine,
  FaUsers,
  FaBookOpen,
  FaVideo,
  FaFileAlt,
  FaChevronRight,
  FaRegClock,
  FaRegEye,
  FaMicrochip,
  FaAtom,
  FaCode,
  FaPaintBrush,
  FaMusic,
  FaLandmark,
  FaTheaterMasks
} from 'react-icons/fa';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recentTopics, setRecentTopics] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [featuredTopics, setFeaturedTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [stats, setStats] = useState({
    categories: 10,
    sections: 50,
    topics: 200,
    users: 10
  });
  
  const searchRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchHomeData();
    
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      console.log('📥 Fetching home data...');
      
      // Fetch all categories
      try {
        const categoriesRes = await api.get('/categories');
        console.log('✅ Categories fetched:', categoriesRes.data?.length || 0);
        setCategories(categoriesRes.data || []);
        setStats(prev => ({ ...prev, categories: categoriesRes.data?.length || 10 }));
      } catch (catError) {
        console.error('❌ Categories error:', catError);
        // Use empty array if fetch fails
        setCategories([]);
      }

      // Fetch recent content
      try {
        const recentRes = await api.get('/content/recent?limit=6');
        console.log('✅ Recent content fetched:', recentRes.data?.length || 0);
        setRecentTopics(Array.isArray(recentRes.data) ? recentRes.data : []);
      } catch (recentError) {
        console.error('❌ Recent content error:', recentError);
        setRecentTopics([]);
      }

      // Fetch trending content
      try {
        const trendingRes = await api.get('/content/trending?limit=6');
        console.log('✅ Trending content fetched:', trendingRes.data?.length || 0);
        setTrendingTopics(Array.isArray(trendingRes.data) ? trendingRes.data : []);
      } catch (trendingError) {
        console.error('❌ Trending content error:', trendingError);
        setTrendingTopics([]);
      }

      // Fetch featured content
      try {
        const featuredRes = await api.get('/content/featured?limit=4');
        console.log('✅ Featured content fetched:', featuredRes.data?.length || 0);
        setFeaturedTopics(Array.isArray(featuredRes.data) ? featuredRes.data : []);
      } catch (featuredError) {
        console.error('❌ Featured content error:', featuredError);
        setFeaturedTopics([]);
      }

      // Fetch stats
      try {
        const statsRes = await api.get('/stats');
        console.log('✅ Stats fetched:', statsRes.data);
        setStats(statsRes.data);
      } catch (statsError) {
        console.error('❌ Stats error (using defaults):', statsError);
        // Keep default stats
      }

    } catch (error) {
      console.error('❌ Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        const response = await api.get(`/content/search?q=${query}&limit=5`);
        setSearchResults(Array.isArray(response.data) ? response.data : []);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return 'Recent';
    }
  };

  // Get section name safely
  const getSectionName = (topic) => {
    if (topic.sectionInfo?.name) return topic.sectionInfo.name;
    if (topic.sectionId?.name) return topic.sectionId.name;
    if (topic.sectionId && typeof topic.sectionId === 'object') return topic.sectionId.name;
    return 'General';
  };

  // Get category name safely
  const getCategoryName = (topic) => {
    if (topic.categoryInfo?.name) return topic.categoryInfo.name;
    if (topic.sectionId?.categoryId?.name) return topic.sectionId.categoryId.name;
    return 'Uncategorized';
  };

  // Get view count safely
  const getViewCount = (topic) => {
    return topic.views || Math.floor(Math.random() * 500) + 100;
  };

  // Category icons mapping with colors
  const getCategoryDetails = (categoryName) => {
    const details = {
      'Computer Science': { icon: <FaLaptop />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
      'Philosophy': { icon: <FaBrain />, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
      'Religion': { icon: <FaChurch />, color: 'from-red-500 to-orange-500', bg: 'bg-red-50', text: 'text-red-600', iconBg: 'bg-red-100' },
      'Social Science': { icon: <FaUniversity />, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
      'Language': { icon: <FaLanguage />, color: 'from-yellow-500 to-amber-500', bg: 'bg-yellow-50', text: 'text-yellow-600', iconBg: 'bg-yellow-100' },
      'Science': { icon: <FaFlask />, color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50', text: 'text-indigo-600', iconBg: 'bg-indigo-100' },
      'Technology': { icon: <FaMicrochip />, color: 'from-gray-700 to-gray-900', bg: 'bg-gray-50', text: 'text-gray-700', iconBg: 'bg-gray-100' },
      'Arts': { icon: <FaPaintBrush />, color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600', iconBg: 'bg-pink-100' },
      'Literature': { icon: <FaBook />, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100' },
      'History': { icon: <FaHistory />, color: 'from-amber-600 to-yellow-600', bg: 'bg-amber-50', text: 'text-amber-600', iconBg: 'bg-amber-100' }
    };
    return details[categoryName] || { icon: <FaBook />, color: 'from-blue-500 to-purple-500', bg: 'bg-gray-50', text: 'text-gray-600', iconBg: 'bg-gray-100' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your knowledge library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            {/* Platform Name */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <FaGraduationCap className="text-4xl" />
              </div>
              <span className="text-4xl md:text-5xl font-bold">Knowlede PathWay</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Share Knowledge
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                without Boundries
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
              Explore 10 disciplines • 50+ subjects • 200+ topics with AI-powered learning assistance
            </p>
            
            {/* Advanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto relative"
              ref={searchRef}
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search anything... (e.g., 'Quantum Physics', 'Plato', 'JavaScript')"
                    className="w-full px-8 py-5 pr-32 text-gray-800 bg-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center space-x-2"
                  >
                    <FaSearch />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Live Search Results */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {searchResults.map((result) => (
                      <Link
                        key={result._id}
                        to={`/content/${result._id}`}
                        className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition border-b last:border-b-0 group"
                        onClick={() => setShowSearchResults(false)}
                      >
                        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                          {result.videoUrl ? <FaVideo /> : <FaFileAlt />}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">{result.title}</h4>
                          <p className="text-sm text-gray-500">
                            {getSectionName(result)} • {getCategoryName(result)}
                          </p>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                      </Link>
                    ))}
                    <div className="p-4 bg-gray-50 border-t">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        See all results for "{searchQuery}"
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Stats with Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <FaBook className="text-3xl mx-auto mb-2 text-yellow-300" />
                <div className="text-3xl font-bold">{stats.categories}</div>
                <div className="text-sm opacity-80">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <FaGraduationCap className="text-3xl mx-auto mb-2 text-green-300" />
                <div className="text-3xl font-bold">{stats.sections}+</div>
                <div className="text-sm opacity-80">Subjects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <FaBookOpen className="text-3xl mx-auto mb-2 text-blue-300" />
                <div className="text-3xl font-bold">{stats.topics}+</div>
                <div className="text-sm opacity-80">Topics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <FaUsers className="text-3xl mx-auto mb-2 text-pink-300" />
                <div className="text-3xl font-bold">{stats.users}K+</div>
                <div className="text-sm opacity-80">Learners</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
            <FaBook className="mr-3 text-blue-600" />
            Explore Categories
          </h2>
          <Link to="/categories" className="text-blue-600 hover:text-blue-700 flex items-center group">
            View All <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const details = getCategoryDetails(category.name);
              return (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setActiveCategory(category._id)}
                  onHoverEnd={() => setActiveCategory(null)}
                >
                  <Link to={`/category/${category._id}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      {/* Colored Top Bar */}
                      <div className={`h-2 bg-gradient-to-r ${details.color}`}></div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`${details.iconBg} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                            <div className={`text-2xl ${details.text}`}>
                              {details.icon}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            {category.order}
                          </span>
                        </div>
                        
                        <h3 className={`text-xl font-bold text-gray-800 mb-2 group-hover:${details.text} transition`}>
                          {category.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <FaBookOpen className="text-xs" />
                            <span>Topics</span>
                          </div>
                          <div className={`${details.text} font-medium flex items-center group-hover:translate-x-2 transition-transform`}>
                            Explore <FaArrowRight className="ml-1 text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </section>

      {/* Featured Topics */}
      {featuredTopics.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 flex items-center">
            <FaStar className="mr-3 text-yellow-500" />
            Featured Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTopics.map((topic, index) => (
              <motion.div
                key={topic._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/content/${topic._id}`}>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-xl transition border border-purple-100">
                    <div className="bg-white p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                      {topic.videoUrl ? <FaVideo className="text-purple-600" /> : <FaFileAlt className="text-pink-600" />}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {topic.theory?.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-white px-2 py-1 rounded-full">{getSectionName(topic)}</span>
                      <span className="flex items-center">
                        <FaRegEye className="mr-1" /> {getViewCount(topic)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Recent & Trending */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Topics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaClock className="mr-3 text-green-600" />
              Recently Added
            </h2>
            
            <div className="space-y-4">
              {recentTopics.length > 0 ? (
                recentTopics.map((topic, index) => (
                  <motion.div
                    key={topic._id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/content/${topic._id}`}>
                      <div className="group flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-xl transition">
                        <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 group-hover:text-white transition">
                          <FaRegClock className="text-green-600 group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {topic.theory?.substring(0, 80)}...
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <span>{getSectionName(topic)}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(topic.createdAt)}</span>
                          </div>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent topics</p>
                </div>
              )}
            </div>
            
            {recentTopics.length > 0 && (
              <Link to="/recent" className="mt-6 block text-center text-green-600 hover:text-green-700 font-medium">
                View All Recent Topics →
              </Link>
            )}
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaFire className="mr-3 text-orange-600" />
              Trending Now
            </h2>
            
            <div className="space-y-4">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic._id || index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/content/${topic._id}`}>
                      <div className="group flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-xl transition">
                        <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition relative">
                          <FaFire className="text-orange-600 group-hover:text-white" />
                          {index === 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                              1
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {topic.theory?.substring(0, 80)}...
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <span>{getSectionName(topic)}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <FaRegEye className="mr-1" /> {getViewCount(topic)} views
                            </span>
                          </div>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No trending topics</p>
                </div>
              )}
            </div>
            
            {trendingTopics.length > 0 && (
              <Link to="/trending" className="mt-6 block text-center text-orange-600 hover:text-orange-700 font-medium">
                View All Trending Topics →
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>
          <div className="absolute inset-0 bg-black opacity-10"></div>
          
          <div className="relative px-8 py-12 md:py-16 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center space-x-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <FaRobot className="text-5xl" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">AI Learning Assistant</h3>
                  <p className="text-xl opacity-90 max-w-2xl">
                    Get instant answers, explanations, and personalized learning recommendations
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">24/7 Available</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">Smart Explanations</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">Topic Recommendations</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
                className="group relative px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center space-x-2"
              >
                <span>Chat with AI</span>
                <FaRobot className="group-hover:rotate-12 transition" />
              </button>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-3xl"></div>
        </motion.div>
      </section>

      {/* Quick Access Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaChartLine className="mr-3 text-blue-600" />
          Quick Access
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category) => {
            const details = getCategoryDetails(category.name);
            return (
              <Link key={category._id} to={`/category/${category._id}`}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className={`${details.bg} rounded-xl p-4 text-center hover:shadow-lg transition group`}
                >
                  <div className={`${details.iconBg} w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition`}>
                    <div className={`${details.text} text-xl`}>
                      {details.icon}
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${details.text}`}>
                    {category.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
          
          <Link to="/categories">
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center group-hover:scale-110 transition">
                <FaArrowRight className="text-gray-600 text-xl" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                View All
              </span>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;