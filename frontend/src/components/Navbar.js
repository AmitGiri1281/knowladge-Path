import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBook, 
  FaSearch, 
  FaBars, 
  FaTimes,
  FaUser,
  FaUserPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronDown,
  FaGraduationCap,
  FaRobot,
  FaHeart,
  FaClock,
  FaSignInAlt,
  FaCog,
  FaExclamationTriangle,
  FaSpinner,
  FaInfoCircle,
  FaBullseye,
  FaEnvelope
} from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Sub-component for Resources Menu
const ResourcesMenu = ({ onClose }) => {
  const resources = [
    { name: "Books", path: "/resources/books", icon: "📚" },
    { name: "Journals", path: "/resources/journals", icon: "📓" },
    { name: "Newspapers & Magazines", path: "/resources/news", icon: "📰" },
    { name: "Workshops", path: "/resources/workshops", icon: "🔧" },
    { name: "Conferences", path: "/resources/conferences", icon: "🎤" },
    { name: "Videos", path: "/resources/videos", icon: "🎥" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
      role="menu"
      aria-label="Resources menu"
    >
      <div className="py-2">
        {resources.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition group"
            onClick={onClose}
            role="menuitem"
          >
            <span className="text-xl" aria-hidden="true">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
      
      {/* Resources Footer */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 text-white">
        <div className="flex items-center space-x-2">
          <FaBook className="text-sm" aria-hidden="true" />
          <span className="text-xs">External reference links only</span>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-component for About Menu (New)
const AboutMenu = ({ onClose }) => {
  const aboutItems = [
    { name: "About Us", path: "/about", icon: "ℹ️", description: "Learn about our mission" },
    { name: "Aims & Goals", path: "/aims", icon: "🎯", description: "Our objectives and vision" },
    { name: "Contact Us", path: "/contact", icon: "📧", description: "Get in touch with us" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
      role="menu"
      aria-label="About menu"
    >
      <div className="py-2">
        {aboutItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-start space-x-3 px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition group"
            onClick={onClose}
            role="menuitem"
          >
            <span className="text-xl" aria-hidden="true">{item.icon}</span>
            <div className="flex-1">
              <span className="font-medium block">{item.name}</span>
              <span className="text-xs text-gray-500 group-hover:text-blue-500">{item.description}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* About Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">
        <div className="flex items-center space-x-2">
          <FaInfoCircle className="text-sm" aria-hidden="true" />
          <span className="text-xs">Empowering knowledge seekers worldwide</span>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-component for Mega Menu
const MegaMenu = ({ categories, sections, onClose }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
      role="menu"
      aria-label="Categories menu"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {categories.map((category) => (
          <div key={category._id} className="space-y-2" role="none">
            <Link
              to={`/category/${category._id}`}
              className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              onClick={onClose}
              role="menuitem"
            >
              <span className="text-2xl" aria-hidden="true">{getCategoryIcon(category.name)}</span>
              <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {category.name}
              </span>
            </Link>
            <div className="pl-8 space-y-1">
              {sections[category._id]?.map((section) => (
                <Link
                  key={section._id}
                  to={`/section/${section._id}`}
                  className="block text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  onClick={onClose}
                  role="menuitem"
                >
                  {section.name}
                </Link>
              ))}
              <Link
                to={`/category/${category._id}`}
                className="block text-xs text-blue-600 hover:text-blue-700 mt-1 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                onClick={onClose}
                role="menuitem"
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
            <FaRobot className="text-2xl" aria-hidden="true" />
            <span className="text-sm">Need help finding something? Ask our AI Assistant</span>
          </div>
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('openChatbot'));
              onClose();
            }}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Open AI chat assistant"
          >
            Chat Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-component for User Menu
const UserMenu = ({ user, isAdmin, onClose, onLogout }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
      role="menu"
      aria-label="User menu"
    >
      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm opacity-90">{user.email}</div>
        {isAdmin && (
          <span className="inline-block mt-1 text-xs bg-yellow-300 text-yellow-800 px-2 py-0.5 rounded-full">
            Admin
          </span>
        )}
      </div>
      <div className="p-2">
        <Link
          to="/profile"
          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          role="menuitem"
        >
          <FaUser className="text-blue-600" aria-hidden="true" />
          <span>My Profile</span>
        </Link>
        <Link
          to="/my-learning"
          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClose}
          role="menuitem"
        >
          <FaBook className="text-blue-600" aria-hidden="true" />
          <span>My Learning</span>
        </Link>
        
        {/* Admin Link - Only for admins */}
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={onClose}
            role="menuitem"
          >
            <FaCog className="text-purple-600" aria-hidden="true" />
            <span>Admin Panel</span>
          </Link>
        )}
        
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-500"
          role="menuitem"
        >
          <FaSignOutAlt className="text-red-600" aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

// Sub-component for Search Results
const SearchResults = ({ results, query, onClose, onSubmit }) => {
  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 text-center text-gray-500">
          <FaExclamationTriangle className="text-3xl mx-auto mb-2 text-yellow-500" />
          <p>No results found for "{query}"</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
    >
      {results.map((result) => (
        <Link
          key={result._id}
          to={`/content/${result._id}`}
          className="block px-4 py-3 hover:bg-gray-50 transition border-b last:border-b-0 focus:outline-none focus:bg-blue-50"
          onClick={onClose}
        >
          <div className="font-medium text-gray-800">{result.title}</div>
          <div className="text-sm text-gray-500">
            {result.sectionId?.name} • {result.sectionId?.categoryId?.name}
          </div>
        </Link>
      ))}
      <div className="p-2 bg-gray-50">
        <button
          onClick={onSubmit}
          className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          See all results for "{query}"
        </button>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false); // New state for About menu
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState({});
  
  const megaMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const resourcesRef = useRef(null);
  const aboutMenuRef = useRef(null); // New ref for About menu
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Close menus when clicking outside
  useEffect(() => {
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
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setShowResources(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target)) {
        setShowAboutMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowMegaMenu(false);
        setShowUserMenu(false);
        setShowSearchResults(false);
        setShowResources(false);
        setShowAboutMenu(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle debounced search
  useEffect(() => {
    if (debouncedSearchQuery.length > 2) {
      performSearch();
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchError(null);
    }
  }, [debouncedSearchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSectionsForCategory = async (categoryId) => {
    // Don't fetch if already loading or have data
    if (loadingCategories[categoryId] || sections[categoryId]) return;

    setLoadingCategories(prev => ({ ...prev, [categoryId]: true }));
    
    try {
      const response = await api.get(`/sections/category/${categoryId}`);
      setSections(prev => ({ ...prev, [categoryId]: response.data.slice(0, 4) }));
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoadingCategories(prev => ({ ...prev, [categoryId]: false }));
    }
  };

  const performSearch = async () => {
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const response = await api.get(`/content/search?q=${debouncedSearchQuery}`);
      setSearchResults(response.data.slice(0, 5));
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to perform search');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
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

  const handleMegaMenuHover = () => {
    // Pre-load sections for visible categories
    categories.slice(0, 6).forEach(cat => {
      if (!sections[cat._id]) {
        fetchSectionsForCategory(cat._id);
      }
    });
  };

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return user?.role === 'admin' || user?.isAdmin === true;
  }, [user]);

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
    <nav 
      className="bg-white shadow-lg sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Knowledge PathWay home"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg transform group-hover:rotate-6 transition">
              <FaGraduationCap className="text-white text-2xl" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Knowledge PathWay
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
                onMouseEnter={handleMegaMenuHover}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition group focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={showMegaMenu}
                aria-haspopup="true"
                aria-label="Categories menu"
              >
                <span className="font-medium">Categories</span>
                <FaChevronDown 
                  className={`text-sm transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} 
                  aria-hidden="true" 
                />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {showMegaMenu && (
                  <MegaMenu 
                    categories={categories} 
                    sections={sections} 
                    onClose={() => setShowMegaMenu(false)} 
                  />
                )}
              </AnimatePresence>
            </div>

            {/* About Menu (New) */}
            <div className="relative" ref={aboutMenuRef}>
              <button
                onClick={() => setShowAboutMenu(!showAboutMenu)}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition group focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={showAboutMenu}
                aria-haspopup="true"
                aria-label="About menu"
              >
                <span className="font-medium">About</span>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ${showAboutMenu ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {showAboutMenu && (
                  <AboutMenu onClose={() => setShowAboutMenu(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setShowResources(!showResources)}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition group focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={showResources}
                aria-haspopup="true"
                aria-label="Resources menu"
              >
                <span className="font-medium">Resources</span>
                <FaChevronDown
                  className={`text-sm transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {showResources && (
                  <ResourcesMenu onClose={() => setShowResources(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link 
              to="/recent" 
              className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaClock className="text-sm" aria-hidden="true" />
              <span className="font-medium">Recent</span>
            </Link>
            <Link 
              to="/popular" 
              className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaHeart className="text-sm" aria-hidden="true" />
              <span className="font-medium">Popular</span>
            </Link>
          </div>

          {/* Right Section - Search + User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} role="search">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search any topic..."
                    className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FaSpinner className="animate-spin text-blue-600" />
                    </div>
                  )}
                </div>
              </form>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && (
                  <SearchResults 
                    results={searchResults}
                    query={searchQuery}
                    onClose={() => setShowSearchResults(false)}
                    onSubmit={handleSearchSubmit}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    <FaUserCircle className="text-xl" aria-hidden="true" />
                    <span className="hidden md:inline font-medium">{user.name?.split(' ')[0]}</span>
                    <FaChevronDown 
                      className={`text-xs transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                      aria-hidden="true" 
                    />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <UserMenu 
                        user={user}
                        isAdmin={isAdmin()}
                        onClose={() => setShowUserMenu(false)}
                        onLogout={handleLogout}
                      />
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <FaSignInAlt aria-hidden="true" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <FaUserPlus aria-hidden="true" />
                    <span className="hidden md:inline">Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-2xl text-gray-700 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              
              {/* Mobile Menu Content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden relative z-50 bg-white"
              >
                <div className="py-4 space-y-4 border-t border-gray-100">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearchSubmit} className="relative px-4">
                    <input
                      type="text"
                      placeholder="Search any topic..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search"
                    />
                    <FaSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  </form>

                  {/* Mobile About Section (New) */}
                  <div className="space-y-2 px-4">
                    <div className="font-semibold text-gray-800 flex items-center space-x-2">
                      <FaInfoCircle className="text-blue-600" />
                      <span>About</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <Link
                        to="/about"
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">ℹ️</span>
                        <div>
                          <div className="font-medium">About Us</div>
                          <div className="text-xs text-gray-500">Learn about our mission</div>
                        </div>
                      </Link>
                      <Link
                        to="/aims"
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">🎯</span>
                        <div>
                          <div className="font-medium">Aims & Goals</div>
                          <div className="text-xs text-gray-500">Our objectives and vision</div>
                        </div>
                      </Link>
                      <Link
                        to="/contact"
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">📧</span>
                        <div>
                          <div className="font-medium">Contact Us</div>
                          <div className="text-xs text-gray-500">Get in touch with us</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Categories */}
                  <div className="space-y-2 px-4">
                    <div className="font-semibold text-gray-800">Categories</div>
                    {categories.map((category) => (
                      <div key={category._id} className="space-y-1">
                        <Link
                          to={`/category/${category._id}`}
                          className="flex items-center space-x-2 px-2 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                              className="block py-1 text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                              onClick={() => setIsOpen(false)}
                            >
                              {section.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Resources */}
                  <div className="space-y-2 px-4">
                    <div className="font-semibold text-gray-800">Resources</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/resources/books"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">📚</span>
                        <span>Books</span>
                      </Link>
                      <Link
                        to="/resources/journals"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">📓</span>
                        <span>Journals</span>
                      </Link>
                      <Link
                        to="/resources/news"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">📰</span>
                        <span>News & Mag</span>
                      </Link>
                      <Link
                        to="/resources/workshops"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">🔧</span>
                        <span>Workshops</span>
                      </Link>
                      <Link
                        to="/resources/conferences"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">🎤</span>
                        <span>Conferences</span>
                      </Link>
                      <Link
                        to="/resources/videos"
                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">🎥</span>
                        <span>Videos</span>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Quick Links */}
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Link
                      to="/recent"
                      className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaClock className="text-blue-600" aria-hidden="true" />
                      <span>Recent</span>
                    </Link>
                    <Link
                      to="/popular"
                      className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaHeart className="text-red-600" aria-hidden="true" />
                      <span>Popular</span>
                    </Link>
                  </div>

                  {/* Mobile User Info */}
                  {user && (
                    <div className="space-y-2 px-4">
                      <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {isAdmin() && (
                          <span className="inline-block mt-1 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      {/* Mobile Admin Link */}
                      {isAdmin() && (
                        <Link
                          to="/admin"
                          className="flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <FaCog aria-hidden="true" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaSignOutAlt aria-hidden="true" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}

                  {/* Mobile Auth */}
                  {!user && (
                    <div className="grid grid-cols-2 gap-2 px-4">
                      <Link
                        to="/login"
                        className="flex items-center justify-center space-x-2 p-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaSignInAlt aria-hidden="true" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUserPlus aria-hidden="true" />
                        <span>Register</span>
                      </Link>
                    </div>
                  )}

                  {/* Mobile AI Assistant */}
                  <div className="px-4">
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('openChatbot'));
                        setTimeout(() => setIsOpen(false), 100);
                      }}
                      className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <FaRobot className="text-xl" aria-hidden="true" />
                      <span>Ask AI Assistant</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;