import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBook, 
  FaSearch, 
  FaBars, 
  FaTimes,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronDown,
  FaGraduationCap,
  FaRobot,
  FaHeart,
  FaClock
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const megaMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCategories();
    // Close menus when clicking outside
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setShowMegaMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
      // Fetch sections for each category
      response.data.forEach(cat => fetchSectionsForCategory(cat._id));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSectionsForCategory = async (categoryId) => {
    try {
      const response = await api.get(`/sections/category/${categoryId}`);
      setSections(prev => ({ ...prev, [categoryId]: response.data.slice(0, 4) })); // Show only first 4
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await api.get(`/content/search?q=${query}`);
        setSearchResults(response.data.slice(0, 5)); // Show only first 5 results
        setShowSearchResults(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Category icons mapping
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Computer Science': '💻',
      'Philosophy': '🧠',
      'Religion': '🕉',
      'Social Science': '🌍',
      'Language': '🌐',
      'Science': '🔬',
      'Technology': '⚙️',
      'Arts': '🎨',
      'Literature': '📚',
      'History': '🏛'
    };
    return icons[categoryName] || '📚';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg transform group-hover:rotate-6 transition">
              <FaGraduationCap className="text-white text-2xl" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Knowlade Path
              </span>
              <span className="hidden md:inline-block ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                Beta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Categories Mega Menu Trigger */}
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={() => setShowMegaMenu(!showMegaMenu)}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition group"
              >
                <span className="font-medium">Categories</span>
                <FaChevronDown className={`text-sm transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {showMegaMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {categories.map((category) => (
                        <div key={category._id} className="space-y-2">
                          <Link
                            to={`/category/${category._id}`}
                            className="flex items-center space-x-2 group"
                            onClick={() => setShowMegaMenu(false)}
                          >
                            <span className="text-2xl">{getCategoryIcon(category.name)}</span>
                            <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                              {category.name}
                            </span>
                          </Link>
                          <div className="pl-8 space-y-1">
                            {sections[category._id]?.map((section) => (
                              <Link
                                key={section._id}
                                to={`/section/${section._id}`}
                                className="block text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition"
                                onClick={() => setShowMegaMenu(false)}
                              >
                                {section.name}
                              </Link>
                            ))}
                            <Link
                              to={`/category/${category._id}`}
                              className="block text-xs text-blue-600 hover:text-blue-700 mt-1 font-medium"
                              onClick={() => setShowMegaMenu(false)}
                            >
                              View all →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Mega Menu Footer */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FaRobot className="text-2xl" />
                          <span className="text-sm">Need help finding something? Ask our AI Assistant</span>
                        </div>
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
                          className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:shadow-lg transition"
                        >
                          Chat Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link to="/recent" className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <FaClock className="text-sm" />
              <span className="font-medium">Recent</span>
            </Link>
            <Link to="/popular" className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <FaHeart className="text-sm" />
              <span className="font-medium">Popular</span>
            </Link>
          </div>

          {/* Right Section - Search + User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search any topic..."
                    className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {loading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </form>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {searchResults.map((result) => (
                      <Link
                        key={result._id}
                        to={`/content/${result._id}`}
                        className="block px-4 py-3 hover:bg-gray-50 transition border-b last:border-b-0"
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="font-medium text-gray-800">{result.title}</div>
                        <div className="text-sm text-gray-500">
                          {result.sectionId?.name} • {result.sectionId?.categoryId?.name}
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 bg-gray-50">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        See all results for "{searchQuery}"
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <FaUserCircle className="text-xl" />
                    <span className="hidden md:inline font-medium">{user.name?.split(' ')[0]}</span>
                    <FaChevronDown className={`text-xs transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm opacity-90">{user.email}</div>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FaUser className="text-blue-600" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/my-learning"
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FaBook className="text-blue-600" />
                            <span>My Learning</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg transition"
                          >
                            <FaSignOutAlt className="text-red-600" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <FaSignInAlt />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                  >
                    <FaUserPlus />
                    <span className="hidden md:inline">Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-2xl text-gray-700 hover:text-blue-600 transition"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-gray-100">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search any topic..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </form>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <div className="font-semibold text-gray-800 px-2">Categories</div>
                  {categories.map((category) => (
                    <div key={category._id} className="space-y-1">
                      <Link
                        to={`/category/${category._id}`}
                        className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">{getCategoryIcon(category.name)}</span>
                        <span className="font-medium">{category.name}</span>
                      </Link>
                      <div className="pl-10 space-y-1">
                        {sections[category._id]?.slice(0, 3).map((section) => (
                          <Link
                            key={section._id}
                            to={`/section/${section._id}`}
                            className="block py-1 text-sm text-gray-500 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                          >
                            {section.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Quick Links */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/recent"
                    className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaClock className="text-blue-600" />
                    <span>Recent</span>
                  </Link>
                  <Link
                    to="/popular"
                    className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaHeart className="text-red-600" />
                    <span>Popular</span>
                  </Link>
                </div>

                {/* Mobile Auth */}
                {!user && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center space-x-2 p-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaSignInAlt />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUserPlus />
                      <span>Register</span>
                    </Link>
                  </div>
                )}

                {/* Mobile AI Assistant */}
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('openChatbot'));
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition"
                >
                  <FaRobot className="text-xl" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;