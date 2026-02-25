import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaBookOpen, 
  FaNewspaper, 
  FaChalkboardTeacher, 
  FaMicrophone, 
  FaPlayCircle,
  FaArrowRight,
  FaExternalLinkAlt
} from 'react-icons/fa';

const Resources = () => {
  const resources = [
    {
      name: "Books",
      path: "/resources/books",
      icon: <FaBook className="text-4xl" />,
      color: "from-blue-600 to-cyan-600",
      bg: "bg-blue-50",
      textColor: "text-blue-600",
      count: "50+ Resources",
      description: "Free books, digital libraries, and reading materials from around the web",
      features: ["Open Library", "Project Gutenberg", "Google Books", "Internet Archive"]
    },
    {
      name: "Journals",
      path: "/resources/journals",
      icon: <FaBookOpen className="text-4xl" />,
      color: "from-green-600 to-teal-600",
      bg: "bg-green-50",
      textColor: "text-green-600",
      count: "100+ Journals",
      description: "Academic papers, research articles, and scholarly publications",
      features: ["Google Scholar", "JSTOR", "PubMed", "arXiv.org"]
    },
    {
      name: "Newspapers & Magazines",
      path: "/resources/news",
      icon: <FaNewspaper className="text-4xl" />,
      color: "from-red-600 to-orange-600",
      bg: "bg-red-50",
      textColor: "text-red-600",
      count: "30+ Publications",
      description: "Latest news, current events, and magazine articles",
      features: ["BBC News", "The Guardian", "Reuters", "The Economist"]
    },
    {
      name: "Workshops",
      path: "/resources/workshops",
      icon: <FaChalkboardTeacher className="text-4xl" />,
      color: "from-purple-600 to-pink-600",
      bg: "bg-purple-50",
      textColor: "text-purple-600",
      count: "25+ Workshops",
      description: "Interactive learning sessions and online courses",
      features: ["Coursera", "edX", "MIT OpenCourseWare", "Google Digital Garage"]
    },
    {
      name: "Conferences",
      path: "/resources/conferences",
      icon: <FaMicrophone className="text-4xl" />,
      color: "from-indigo-600 to-blue-600",
      bg: "bg-indigo-50",
      textColor: "text-indigo-600",
      count: "40+ Conferences",
      description: "Talks, presentations, and conference proceedings",
      features: ["TED Talks", "Google I/O", "PyCon", "DEF CON"]
    },
    {
      name: "Videos",
      path: "/resources/videos",
      icon: <FaPlayCircle className="text-4xl" />,
      color: "from-orange-600 to-red-600",
      bg: "bg-orange-50",
      textColor: "text-orange-600",
      count: "200+ Videos",
      description: "Educational video content and lectures",
      features: ["Khan Academy", "Crash Course", "MIT OCW", "3Blue1Brown"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Learning Resources
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Free external resources to enhance your learning journey. All links open in new tabs.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${resource.color}`}></div>
              <div className="p-6">
                <div className={`w-16 h-16 ${resource.bg} rounded-xl flex items-center justify-center mb-4 ${resource.textColor}`}>
                  {resource.icon}
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold text-gray-800">{resource.name}</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {resource.count}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Featured Resources:</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link to={resource.path}>
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${resource.color} text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 group`}>
                    <span>Explore {resource.name}</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-semibold text-yellow-800 mb-2">📚 External Resources Notice</h3>
          <p className="text-yellow-700">
            All resources listed are external links to free educational content. We do not host any copyrighted material. 
            Please respect the terms of service of each website.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Resources;