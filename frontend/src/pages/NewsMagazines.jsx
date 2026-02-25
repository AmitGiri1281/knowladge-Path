import React, { useState } from 'react';
import { FaExternalLinkAlt, FaNewspaper, FaGlobe, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NewsMagazines = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      title: "BBC News",
      description: "International news from the British Broadcasting Corporation",
      url: "https://www.bbc.com/news",
      category: "International News",
      type: "News",
      features: ["Live updates", "Video content", "World coverage"]
    },
    {
      title: "The Guardian",
      description: "Independent journalism with global perspective",
      url: "https://www.theguardian.com",
      category: "International News",
      type: "News",
      features: ["Free access", "Investigative", "Opinion pieces"]
    },
    {
      title: "Reuters",
      description: "World news and financial information",
      url: "https://www.reuters.com",
      category: "Financial News",
      type: "News",
      features: ["Real-time", "Financial focus", "Global"]
    },
    {
      title: "Associated Press",
      description: "Independent global news network",
      url: "https://apnews.com",
      category: "International News",
      type: "News",
      features: ["Breaking news", "Photo essays", "Video"]
    },
    {
      title: "The Economist",
      description: "Weekly newspaper focusing on current affairs, international business, politics, and technology",
      url: "https://www.economist.com",
      category: "Business & Politics",
      type: "Magazine",
      features: ["In-depth analysis", "Global perspective", "Some free articles"]
    },
    {
      title: "National Geographic",
      description: "Science, exploration, and storytelling",
      url: "https://www.nationalgeographic.com",
      category: "Science & Nature",
      type: "Magazine",
      features: ["Photography", "Science", "Environment"]
    },
    {
      title: "The Atlantic",
      description: "Journalism covering politics, culture, technology, and more",
      url: "https://www.theatlantic.com",
      category: "Culture & Politics",
      type: "Magazine",
      features: ["Long-form", "Analysis", "Commentary"]
    },
    {
      title: "New Scientist",
      description: "Latest science news and discoveries",
      url: "https://www.newscientist.com",
      category: "Science",
      type: "Magazine",
      features: ["Science news", "Breakthroughs", "Analysis"]
    },
    {
      title: "Wired",
      description: "Technology, science, and culture news",
      url: "https://www.wired.com",
      category: "Technology",
      type: "Magazine",
      features: ["Tech news", "Reviews", "Future trends"]
    },
    {
      title: "Foreign Affairs",
      description: "Leading publication on international relations",
      url: "https://www.foreignaffairs.com",
      category: "International Relations",
      type: "Magazine",
      features: ["Expert analysis", "Global affairs", "Policy"]
    },
    {
      title: "Smithsonian Magazine",
      description: "History, science, arts, and culture",
      url: "https://www.smithsonianmag.com",
      category: "History & Culture",
      type: "Magazine",
      features: ["History", "Science", "Arts"]
    },
    {
      title: "The New Yorker",
      description: "Journalism, commentary, criticism, fiction, and cartoons",
      url: "https://www.newyorker.com",
      category: "Culture & Arts",
      type: "Magazine",
      features: ["Long-form", "Fiction", "Criticism"]
    },
    {
      title: "TIME Magazine",
      description: "Current events and analysis",
      url: "https://time.com",
      category: "Current Events",
      type: "Magazine",
      features: ["News", "Analysis", "Profiles"]
    },
    {
      title: "Forbes",
      description: "Business, investing, technology, entrepreneurship",
      url: "https://www.forbes.com",
      category: "Business",
      type: "Magazine",
      features: ["Business news", "Lists", "Entrepreneurship"]
    },
    {
      title: "Bloomberg",
      description: "Business and financial news",
      url: "https://www.bloomberg.com",
      category: "Financial News",
      type: "News",
      features: ["Markets", "Analysis", "Business"]
    },
    {
      title: "Politico",
      description: "Politics and policy news",
      url: "https://www.politico.com",
      category: "Politics",
      type: "News",
      features: ["Politics", "Policy", "Inside information"]
    }
  ];

  // Get unique categories and types
  const categories = ['All', ...new Set(resources.map(r => r.category))];
  const types = ['All', ...new Set(resources.map(r => r.type))];

  // Filter resources based on selected filters and search term
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  // Get count for each category
  const getCategoryCount = (category) => {
    if (category === 'All') return resources.length;
    return resources.filter(r => r.category === category).length;
  };

  // Get count for each type
  const getTypeCount = (type) => {
    if (type === 'All') return resources.length;
    return resources.filter(r => r.type === type).length;
  };

  // Check if any filter is active
  const isFilterActive = selectedCategory !== 'All' || selectedType !== 'All' || searchTerm !== '';

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedType('All');
    setSearchTerm('');
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Newspapers & Magazines
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Access to leading newspapers and magazines from around the world. Many offer free articles and content.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <FaNewspaper className="text-2xl text-red-500 mb-2" />
            <div className="font-semibold">{resources.filter(r => r.type === 'News').length}+</div>
            <div className="text-sm text-gray-600">News Sources</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <FaGlobe className="text-2xl text-blue-500 mb-2" />
            <div className="font-semibold">{resources.filter(r => r.type === 'Magazine').length}+</div>
            <div className="text-sm text-gray-600">Magazines</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <FaClock className="text-2xl text-green-500 mb-2" />
            <div className="font-semibold">Daily</div>
            <div className="text-sm text-gray-600">Updates</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="font-semibold">Free</div>
            <div className="text-sm text-gray-600">Access Options</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Active Filters Indicator */}
          {isFilterActive && (
            <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
              <span className="text-sm text-red-700">
                <span className="font-medium">Active Filters:</span>{' '}
                {selectedCategory !== 'All' && `Category: ${selectedCategory} `}
                {selectedType !== 'All' && `Type: ${selectedType} `}
                {searchTerm !== '' && `Search: "${searchTerm}"`}
              </span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Type Filter */}
          <div>
            <div className="flex items-center mb-2">
              <FaFilter className="text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">Filter by Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-red-600 text-white shadow-md scale-105'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {type} ({getTypeCount(type)})
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center mb-2">
              <FaFilter className="text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">Filter by Category:</span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="ml-3 text-sm text-red-600 hover:text-red-700"
                >
                  Clear
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
                      ? 'bg-orange-600 text-white shadow-md scale-105'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category} ({getCategoryCount(category)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredResources.length} of {resources.length} resources
        </div>

        {/* Resources Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + selectedType + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg transition ${
                      resource.type === 'News' 
                        ? 'bg-red-100 group-hover:bg-red-200' 
                        : 'bg-orange-100 group-hover:bg-orange-200'
                    }`}>
                      {resource.type === 'News' 
                        ? <FaNewspaper className="text-2xl text-red-600" />
                        : <FaGlobe className="text-2xl text-orange-600" />
                      }
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-red-600 transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                      resource.type === 'News'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {resource.category}
                    </span>
                    <span className="text-xs text-gray-500">{resource.type}</span>
                  </div>
                </motion.a>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="font-semibold text-lg mb-3">Reading Tips:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Free Access</h4>
              <p className="text-sm text-gray-600">Many sites offer a certain number of free articles per month</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Newsletters</h4>
              <p className="text-sm text-gray-600">Subscribe to free newsletters for curated content</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Mobile Apps</h4>
              <p className="text-sm text-gray-600">Download apps for convenient reading on mobile devices</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> These are external links to news and magazine websites. Some content may be behind paywalls, 
            but all offer free articles and content.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsMagazines;