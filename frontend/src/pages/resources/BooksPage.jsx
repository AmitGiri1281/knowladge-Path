import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaDownload, 
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaStar,
  FaUserGraduate,
  FaUniversity
} from 'react-icons/fa';
import api from '../../services/api';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      // In a real app, this would be an API endpoint
      // For now, using sample data
      const sampleBooks = [
        {
          id: 1,
          title: "Introduction to Library Science",
          author: "Dr. S.R. Ranganathan",
          category: "Library Science",
          description: "Comprehensive guide to library science fundamentals",
          downloadUrl: "https://example.com/book1.pdf",
          coverImage: "https://via.placeholder.com/150x200?text=Book+1",
          rating: 4.5,
          downloads: 1234,
          publisher: "University Press"
        },
        {
          id: 2,
          title: "Digital Libraries: Principles and Practice",
          author: "Michael Lesk",
          category: "Information Science",
          description: "Modern approaches to digital library management",
          downloadUrl: "https://example.com/book2.pdf",
          coverImage: "https://via.placeholder.com/150x200?text=Book+2",
          rating: 4.3,
          downloads: 892,
          publisher: "Morgan Kaufmann"
        },
        // Add more books as needed
      ];
      setBooks(sampleBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">eBooks Collection</h1>
          <p className="text-xl opacity-90">Access thousands of academic and professional eBooks</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books by title, author, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-64">
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {filteredBooks.length} books
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="flex">
                    <div className="w-24 h-32 bg-gray-200 flex-shrink-0">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100">
                          <FaBook className="text-3xl text-blue-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center mb-2">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{book.rating}</span>
                        <span className="text-xs text-gray-400 ml-2">{book.downloads} downloads</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{book.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {book.category}
                        </span>
                        <a
                          href={book.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                          <FaDownload className="mr-1" /> Download
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* External Resources Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">External eBook Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="https://www.doabooks.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
          >
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">DOAB</h3>
              <p className="text-sm text-gray-600">Directory of Open Access Books</p>
            </div>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-600" />
          </a>
          <a
            href="https://www.gutenberg.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
          >
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Project Gutenberg</h3>
              <p className="text-sm text-gray-600">Free eBooks</p>
            </div>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-600" />
          </a>
          <a
            href="https://open.umn.edu/opentextbooks/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
          >
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Open Textbook Library</h3>
              <p className="text-sm text-gray-600">Open textbooks</p>
            </div>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-600" />
          </a>
          <a
            href="https://www.oapen.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
          >
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">OAPEN</h3>
              <p className="text-sm text-gray-600">Open Access Publishing</p>
            </div>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;