import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBook className="text-3xl text-blue-600" />
            <span className="text-xl font-bold text-gray-800">LearnHub</span>
          </Link>

          {/* Desktop Categories */}
          <div className="hidden md:flex space-x-8">
            {categories.slice(0, 5).map(category => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            {categories.map(category => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="block py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;