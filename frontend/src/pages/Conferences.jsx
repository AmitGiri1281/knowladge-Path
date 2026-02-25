import React, { useState } from 'react';
import { FaExternalLinkAlt, FaCalendar, FaVideo, FaUsers, FaMicrophone, FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Conferences = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const conferences = [
    {
      title: "TED Talks",
      description: "Ideas worth spreading - conference recordings and talks",
      url: "https://www.ted.com",
      category: "Technology/Entertainment/Design",
      type: "Recordings",
      features: ["Free", "Inspirational", "Diverse topics"]
    },
    {
      title: "Google I/O",
      description: "Google's developer conference - sessions and keynotes",
      url: "https://io.google",
      category: "Technology",
      type: "Archive",
      features: ["Free", "Developer focus", "Product launches"]
    },
    {
      title: "Apple WWDC",
      description: "Apple Worldwide Developers Conference videos",
      url: "https://developer.apple.com/wwdc",
      category: "Technology",
      type: "Archive",
      features: ["Free", "Apple ecosystem", "Technical sessions"]
    },
    {
      title: "Microsoft Build",
      description: "Microsoft developer conference content",
      url: "https://build.microsoft.com",
      category: "Technology",
      type: "Archive",
      features: ["Free", "Cloud & AI", "Developer tools"]
    },
    {
      title: "AWS re:Invent",
      description: "Amazon Web Services conference sessions",
      url: "https://reinvent.awsevents.com",
      category: "Cloud Computing",
      type: "Archive",
      features: ["Free sessions", "Cloud focus", "Technical"]
    },
    {
      title: "PyCon",
      description: "Python community conference recordings",
      url: "https://pycon.org",
      category: "Programming",
      type: "Archive",
      features: ["Free", "Python focus", "Community"]
    },
    {
      title: "JSConf",
      description: "JavaScript conference talks and workshops",
      url: "https://jsconf.com",
      category: "Programming",
      type: "Archive",
      features: ["JavaScript", "Community", "Technical"]
    },
    {
      title: "DEF CON",
      description: "World's largest hacking conference - presentations",
      url: "https://defcon.org",
      category: "Security",
      type: "Archive",
      features: ["Security focus", "Presentations", "Community"]
    },
    {
      title: "Black Hat",
      description: "Information security conference - briefings",
      url: "https://www.blackhat.com",
      category: "Security",
      type: "Archive",
      features: ["Security", "Briefings", "Research"]
    },
    {
      title: "Grace Hopper Celebration",
      description: "Women in computing conference recordings",
      url: "https://ghc.anitab.org",
      category: "Technology",
      type: "Archive",
      features: ["Diversity", "Technical", "Career"]
    },
    {
      title: "Strata Data Conference",
      description: "Data science and AI conference content",
      url: "https://conferences.oreilly.com/strata",
      category: "Data Science",
      type: "Archive",
      features: ["Data focus", "AI/ML", "Industry"]
    },
    {
      title: "KubeCon",
      description: "Cloud Native Computing Foundation conference",
      url: "https://events.linuxfoundation.org/kubecon-cloudnativecon",
      category: "Cloud Native",
      type: "Archive",
      features: ["Kubernetes", "Cloud native", "Technical"]
    },
    {
      title: "RSA Conference",
      description: "Cybersecurity conference sessions",
      url: "https://www.rsaconference.com",
      category: "Security",
      type: "Archive",
      features: ["Security", "Keynotes", "Sessions"]
    },
    {
      title: "Web Summit",
      description: "Technology conference talks and panels",
      url: "https://websummit.com",
      category: "Technology",
      type: "Archive",
      features: ["Startups", "Tech", "Innovation"]
    },
    {
      title: "SXSW",
      description: "Film, music, and technology conference",
      url: "https://www.sxsw.com",
      category: "Multidisciplinary",
      type: "Archive",
      features: ["Creative", "Tech", "Culture"]
    },
    {
      title: "NeurIPS",
      description: "Conference on Neural Information Processing Systems",
      url: "https://nips.cc",
      category: "AI/ML",
      type: "Academic",
      features: ["Research", "Papers", "Presentations"]
    },
    {
      title: "ICML",
      description: "International Conference on Machine Learning",
      url: "https://icml.cc",
      category: "AI/ML",
      type: "Academic",
      features: ["Research", "Machine Learning", "Academic"]
    },
    {
      title: "ACM Digital Library",
      description: "Conference proceedings from ACM",
      url: "https://dl.acm.org",
      category: "Computer Science",
      type: "Proceedings",
      features: ["Research", "Papers", "Open access"]
    }
  ];

  // Get unique categories and types
  const categories = ['All', ...new Set(conferences.map(c => c.category))];
  const types = ['All', ...new Set(conferences.map(c => c.type))];

  // Filter conferences based on selected filters and search term
  const filteredConferences = conferences.filter(conf => {
    const matchesCategory = selectedCategory === 'All' || conf.category === selectedCategory;
    const matchesType = selectedType === 'All' || conf.type === selectedType;
    const matchesSearch = conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conf.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  // Get count for each category
  const getCategoryCount = (category) => {
    if (category === 'All') return conferences.length;
    return conferences.filter(c => c.category === category).length;
  };

  // Get count for each type
  const getTypeCount = (type) => {
    if (type === 'All') return conferences.length;
    return conferences.filter(c => c.type === type).length;
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Conferences & Events
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Access conference recordings, presentations, and proceedings from major events worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaVideo className="text-3xl text-indigo-600 mx-auto mb-2" />
            <div className="font-semibold">1000+</div>
            <div className="text-sm text-gray-600">Conference Talks</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaUsers className="text-3xl text-indigo-600 mx-auto mb-2" />
            <div className="font-semibold">50+</div>
            <div className="text-sm text-gray-600">Major Conferences</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaMicrophone className="text-3xl text-indigo-600 mx-auto mb-2" />
            <div className="font-semibold">Free</div>
            <div className="text-sm text-gray-600">Access</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaCalendar className="text-3xl text-indigo-600 mx-auto mb-2" />
            <div className="font-semibold">Year-round</div>
            <div className="text-sm text-gray-600">Availability</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search conferences by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Active Filters Indicator */}
          {isFilterActive && (
            <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg">
              <span className="text-sm text-indigo-700">
                <span className="font-medium">Active Filters:</span>{' '}
                {selectedCategory !== 'All' && `Category: ${selectedCategory} `}
                {selectedType !== 'All' && `Type: ${selectedType} `}
                {searchTerm !== '' && `Search: "${searchTerm}"`}
              </span>
              <button
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
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
              {selectedType !== 'All' && (
                <button
                  onClick={() => setSelectedType('All')}
                  className="ml-3 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
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
                  className="ml-3 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredConferences.length} of {conferences.length} conferences
        </div>

        {/* Conferences Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + selectedType + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredConferences.length > 0 ? (
              filteredConferences.map((conf, index) => (
                <motion.a
                  key={index}
                  href={conf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition">
                      <FaMicrophone className="text-2xl text-indigo-600" />
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-indigo-600 transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{conf.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{conf.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {conf.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-sm text-indigo-600 rounded-full">
                      {conf.category}
                    </span>
                    <span className="text-xs text-gray-500">{conf.type}</span>
                  </div>
                </motion.a>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-500 text-lg">No conferences found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-indigo-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-3">How to Access Conference Content:</h3>
            <ul className="space-y-2">
              <li>• Many conferences post videos on YouTube after the event</li>
              <li>• Official conference websites often have archives</li>
              <li>• Keynote presentations are usually free to watch</li>
              <li>• Academic proceedings may be available through libraries</li>
            </ul>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-lg mb-3">Benefits of Watching Conference Talks:</h3>
            <ul className="space-y-2">
              <li>• Learn about latest trends and research</li>
              <li>• Hear from industry leaders and experts</li>
              <li>• Discover new technologies and methodologies</li>
              <li>• Network virtually with speakers and attendees</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> These are external links to conference content. Availability varies - some content 
            may be from past events but remains valuable for learning.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Conferences;