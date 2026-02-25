import React from 'react';
import { FaExternalLinkAlt, FaNewspaper, FaGlobe, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NewsMagazines = () => {
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

  const categories = [...new Set(resources.map(r => r.category))];
  const types = [...new Set(resources.map(r => r.type))];

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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
          ))}
        </div>

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