import React, { useState } from 'react';
import { FaExternalLinkAlt, FaBook, FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    {
      title: "Open Library",
      description: "Free access to millions of books - one web page for every book ever published",
      url: "https://openlibrary.org",
      category: "General",
      features: ["3M+ books", "Free access", "No registration"]
    },
    {
      title: "Project Gutenberg",
      description: "Over 60,000 free eBooks, especially older works for which copyright has expired",
      url: "https://www.gutenberg.org",
      category: "Literature",
      features: ["60,000+ books", "Classics", "Multiple formats"]
    },
    {
      title: "Google Books",
      description: "Search and preview millions of books from libraries and publishers worldwide",
      url: "https://books.google.com",
      category: "General",
      features: ["10M+ books", "Preview", "Research tool"]
    },
    {
      title: "Internet Archive",
      description: "Digital library offering free universal access to books, movies & music",
      url: "https://archive.org/details/texts",
      category: "General",
      features: ["20M+ items", "Historical", "Multiple formats"]
    },
    {
      title: "FreeCodeCamp",
      description: "Learn to code - free programming books, tutorials, and resources",
      url: "https://www.freecodecamp.org",
      category: "Programming",
      features: ["Interactive", "Free certification", "Community"]
    },
    {
      title: "O'Reilly Open Books",
      description: "Free programming and tech books from O'Reilly Media",
      url: "https://www.oreilly.com/openbook/",
      category: "Technology",
      features: ["Tech focus", "Quality content", "Expert authors"]
    },
    {
      title: "PDF Drive",
      description: "Free PDF search engine with millions of books to download",
      url: "https://www.pdfdrive.com",
      category: "General",
      features: ["80M+ books", "PDF format", "Searchable"]
    },
    {
      title: "BookBoon",
      description: "Free textbooks and eBooks for students and professionals",
      url: "https://bookboon.com",
      category: "Academic",
      features: ["Textbooks", "Business", "Engineering"]
    },
    {
      title: "ManyBooks",
      description: "Free eBooks for your eReader, iPad, Kindle or smartphone",
      url: "https://manybooks.net",
      category: "General",
      features: ["50,000+ books", "Multiple genres", "Various formats"]
    },
    {
      title: "LibriVox",
      description: "Free audiobooks of public domain works read by volunteers",
      url: "https://librivox.org",
      category: "Audiobooks",
      features: ["15,000+ books", "Free audiobooks", "Public domain"]
    },
    {
      title: "Directory of Open Access Books",
      description: "Peer-reviewed books from academic publishers",
      url: "https://www.doabooks.org",
      category: "Academic",
      features: ["Peer-reviewed", "Academic", "Open access"]
    },
    {
      title: "National Science Digital Library",
      description: "Free STEM education resources and books",
      url: "https://nsdl.oercommons.org",
      category: "Science",
      features: ["STEM focus", "Educational", "K-12 & college"]
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(books.map(book => book.category))];

  // Filter books based on selected category and search term
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get count for each category
  const getCategoryCount = (category) => {
    if (category === 'All') return books.length;
    return books.filter(book => book.category === category).length;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Books Resources
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Free external book resources and digital libraries. All links open in new tabs and are completely free to use.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search books by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <FaFilter className="text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by Category:</span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="ml-3 text-sm text-blue-600 hover:text-blue-700"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category} ({getCategoryCount(category)})
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredBooks.length} of {books.length} resources
        </div>

        {/* Books Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <motion.a
                  key={index}
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                      <FaBook className="text-2xl text-blue-600" />
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-600 transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{book.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {book.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-sm text-blue-600 rounded-full">
                    {book.category}
                  </span>
                </motion.a>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> These are external links to free resources. We do not host any copyrighted content. 
            Please respect the terms of service of each website.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Books;