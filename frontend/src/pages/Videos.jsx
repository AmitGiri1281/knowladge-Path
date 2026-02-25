import React, { useState } from 'react';
import { FaExternalLinkAlt, FaYoutube, FaPlay, FaGraduationCap, FaChalkboardTeacher, FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const videos = [
    {
      title: "Khan Academy",
      description: "Free educational videos on math, science, and more",
      url: "https://www.khanacademy.org",
      category: "Education",
      platform: "Educational",
      features: ["K-12 focus", "Practice exercises", "Complete courses"]
    },
    {
      title: "Crash Course",
      description: "Educational YouTube series on various subjects",
      url: "https://www.youtube.com/user/crashcourse",
      category: "Education",
      platform: "YouTube",
      features: ["Entertaining", "Fast-paced", "Comprehensive"]
    },
    {
      title: "TED-Ed",
      description: "Animated educational videos",
      url: "https://ed.ted.com",
      category: "Education",
      platform: "Educational",
      features: ["Animation", "Short format", "Discussion questions"]
    },
    {
      title: "MIT OpenCourseWare Video",
      description: "MIT course lectures on video",
      url: "https://ocw.mit.edu/search/?type=video",
      category: "Academic",
      platform: "University",
      features: ["MIT courses", "Full lectures", "Free"]
    },
    {
      title: "Stanford Online Videos",
      description: "Stanford University course videos",
      url: "https://online.stanford.edu/courses",
      category: "Academic",
      platform: "University",
      features: ["Stanford quality", "Various subjects", "Free options"]
    },
    {
      title: "Yale Courses",
      description: "Yale University open courses on YouTube",
      url: "https://www.youtube.com/user/YaleCourses",
      category: "Academic",
      platform: "YouTube",
      features: ["Ivy League", "Full courses", "Free"]
    },
    {
      title: "Harvard Online Learning",
      description: "Harvard course videos and lectures",
      url: "https://online-learning.harvard.edu",
      category: "Academic",
      platform: "University",
      features: ["Harvard", "Various formats", "Free & paid"]
    },
    {
      title: "Computerphile",
      description: "Videos about computer science",
      url: "https://www.youtube.com/user/Computerphile",
      category: "Computer Science",
      platform: "YouTube",
      features: ["Deep dives", "Expert interviews", "Technical"]
    },
    {
      title: "Numberphile",
      description: "Videos about numbers and mathematics",
      url: "https://www.youtube.com/user/numberphile",
      category: "Mathematics",
      platform: "YouTube",
      features: ["Engaging", "Visual", "Expert explanations"]
    },
    {
      title: "3Blue1Brown",
      description: "Animated math videos",
      url: "https://www.youtube.com/c/3blue1brown",
      category: "Mathematics",
      platform: "YouTube",
      features: ["Beautiful animations", "Deep concepts", "Intuitive"]
    },
    {
      title: "Veritasium",
      description: "Science and engineering videos",
      url: "https://www.youtube.com/user/1veritasium",
      category: "Science",
      platform: "YouTube",
      features: ["Experiments", "Interviews", "Explanations"]
    },
    {
      title: "SmarterEveryDay",
      description: "Science and engineering explained",
      url: "https://www.youtube.com/user/destinws2",
      category: "Science",
      platform: "YouTube",
      features: ["High-speed video", "Experiments", "Deep dives"]
    },
    {
      title: "CGP Grey",
      description: "Explanatory videos on various topics",
      url: "https://www.youtube.com/user/CGPGrey",
      category: "General",
      platform: "YouTube",
      features: ["Clear explanations", "Humorous", "Thought-provoking"]
    },
    {
      title: "Kurzgesagt",
      description: "Animated science videos",
      url: "https://www.youtube.com/c/inanutshell",
      category: "Science",
      platform: "YouTube",
      features: ["Beautiful animation", "Optimistic", "Research-based"]
    },
    {
      title: "Vsauce",
      description: "Mind-blowing science and philosophy videos",
      url: "https://www.youtube.com/user/Vsauce",
      category: "Science",
      platform: "YouTube",
      features: ["Thought experiments", "Curiosity", "Deep questions"]
    },
    {
      title: "National Geographic",
      description: "Science, nature, and exploration videos",
      url: "https://www.youtube.com/user/NationalGeographic",
      category: "Science/Nature",
      platform: "YouTube",
      features: ["High production", "Documentaries", "Exploration"]
    },
    {
      title: "BBC Earth",
      description: "Nature and science videos",
      url: "https://www.youtube.com/user/BBCEarth",
      category: "Nature",
      platform: "YouTube",
      features: ["Nature documentaries", "High quality", "Educational"]
    },
    {
      title: "The School of Life",
      description: "Videos on emotional and psychological topics",
      url: "https://www.youtube.com/user/schooloflifechannel",
      category: "Psychology",
      platform: "YouTube",
      features: ["Philosophy", "Emotional intelligence", "Self-help"]
    }
  ];

  // Get unique categories and platforms
  const categories = ['All', ...new Set(videos.map(v => v.category))];
  const platforms = ['All', ...new Set(videos.map(v => v.platform))];

  // Filter videos based on selected filters and search term
  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'All' || video.platform === selectedPlatform;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesPlatform && matchesSearch;
  });

  // Get count for each category
  const getCategoryCount = (category) => {
    if (category === 'All') return videos.length;
    return videos.filter(v => v.category === category).length;
  };

  // Get count for each platform
  const getPlatformCount = (platform) => {
    if (platform === 'All') return videos.length;
    return videos.filter(v => v.platform === platform).length;
  };

  // Check if any filter is active
  const isFilterActive = selectedCategory !== 'All' || selectedPlatform !== 'All' || searchTerm !== '';

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPlatform('All');
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Educational Videos
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Curated collection of free educational video resources from YouTube and university channels.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaYoutube className="text-4xl text-red-600 mx-auto mb-2" />
            <div className="font-semibold">{videos.filter(v => v.platform === 'YouTube').length}+</div>
            <div className="text-sm text-gray-600">YouTube Channels</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaGraduationCap className="text-4xl text-blue-600 mx-auto mb-2" />
            <div className="font-semibold">{videos.filter(v => v.platform === 'University').length}+</div>
            <div className="text-sm text-gray-600">University Channels</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaPlay className="text-4xl text-green-600 mx-auto mb-2" />
            <div className="font-semibold">1000+</div>
            <div className="text-sm text-gray-600">Hours of Content</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search videos by title, description, or category..."
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
                {selectedPlatform !== 'All' && `Platform: ${selectedPlatform} `}
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

          {/* Platform Filter */}
          <div>
            <div className="flex items-center mb-2">
              <FaFilter className="text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">Filter by Platform:</span>
              {selectedPlatform !== 'All' && (
                <button
                  onClick={() => setSelectedPlatform('All')}
                  className="ml-3 text-sm text-red-600 hover:text-red-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedPlatform === platform
                      ? platform === 'YouTube'
                        ? 'bg-red-600 text-white shadow-md scale-105'
                        : platform === 'University'
                        ? 'bg-blue-600 text-white shadow-md scale-105'
                        : 'bg-green-600 text-white shadow-md scale-105'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {platform} ({getPlatformCount(platform)})
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
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white shadow-md scale-105'
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
          Showing {filteredVideos.length} of {videos.length} videos
        </div>

        {/* Videos Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + selectedPlatform + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <motion.a
                  key={index}
                  href={video.url}
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
                      video.platform === 'YouTube' 
                        ? 'bg-red-100 group-hover:bg-red-200' 
                        : video.platform === 'University'
                        ? 'bg-blue-100 group-hover:bg-blue-200'
                        : 'bg-green-100 group-hover:bg-green-200'
                    }`}>
                      {video.platform === 'YouTube' 
                        ? <FaYoutube className="text-2xl text-red-600" />
                        : video.platform === 'University'
                        ? <FaGraduationCap className="text-2xl text-blue-600" />
                        : <FaPlay className="text-2xl text-green-600" />
                      }
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-red-600 transition" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{video.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {video.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-red-50 text-sm text-red-600 rounded-full">
                      {video.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      video.platform === 'YouTube'
                        ? 'bg-red-100 text-red-600'
                        : video.platform === 'University'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {video.platform}
                    </span>
                  </div>
                </motion.a>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-500 text-lg">No videos found matching your criteria.</p>
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

        {/* Learning Tips */}
        <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl">
          <h3 className="font-semibold text-lg mb-3">Tips for Learning from Videos:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Active Watching</h4>
              <p className="text-sm text-gray-600">Take notes, pause to think, and rewatch difficult sections</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Create Playlists</h4>
              <p className="text-sm text-gray-600">Organize videos by topic for structured learning</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Supplement Learning</h4>
              <p className="text-sm text-gray-600">Combine videos with reading and practice exercises</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> These are external links to educational video content. All resources are free to access 
            and respect copyright laws.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Videos;