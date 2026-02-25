import React from 'react';
import { FaExternalLinkAlt, FaTools, FaLaptop, FaUsers, FaCertificate } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Workshops = () => {
  const workshops = [
    {
      title: "Coursera",
      description: "Online courses and workshops from top universities and companies",
      url: "https://www.coursera.org",
      category: "Online Learning",
      features: ["Free audit", "Certificates", "University partners"]
    },
    {
      title: "edX",
      description: "Free online courses and workshops from leading institutions",
      url: "https://www.edx.org",
      category: "Online Learning",
      features: ["Free access", "Verified certificates", "University-level"]
    },
    {
      title: "MIT OpenCourseWare",
      description: "Free MIT course materials and workshops",
      url: "https://ocw.mit.edu",
      category: "Academic",
      features: ["MIT courses", "Free", "Self-paced"]
    },
    {
      title: "Stanford Online",
      description: "Free and paid workshops from Stanford University",
      url: "https://online.stanford.edu",
      category: "Academic",
      features: ["Stanford courses", "Professional", "Free options"]
    },
    {
      title: "Google Digital Garage",
      description: "Free workshops on digital skills and career development",
      url: "https://learndigital.withgoogle.com/digitalgarage",
      category: "Digital Skills",
      features: ["Free", "Certificates", "Self-paced"]
    },
    {
      title: "Microsoft Learn",
      description: "Free workshops and learning paths for Microsoft technologies",
      url: "https://learn.microsoft.com",
      category: "Technology",
      features: ["Free", "Hands-on", "Certification prep"]
    },
    {
      title: "IBM SkillsBuild",
      description: "Free technology workshops and courses",
      url: "https://skillsbuild.org",
      category: "Technology",
      features: ["Free", "Career focus", "Industry recognized"]
    },
    {
      title: "AWS Training",
      description: "Free and paid workshops for cloud computing",
      url: "https://aws.amazon.com/training",
      category: "Cloud Computing",
      features: ["Free digital", "Hands-on", "Certification"]
    },
    {
      title: "LinkedIn Learning",
      description: "Workshops and courses on business, technology, and creative skills",
      url: "https://www.linkedin.com/learning",
      category: "Professional",
      features: ["Expert instructors", "Certificate", "Monthly free"]
    },
    {
      title: "Skillshare",
      description: "Workshops on creative and entrepreneurial skills",
      url: "https://www.skillshare.com",
      category: "Creative",
      features: ["Project-based", "Creative focus", "Free trial"]
    },
    {
      title: "Khan Academy",
      description: "Free workshops and practice exercises",
      url: "https://www.khanacademy.org",
      category: "Academic",
      features: ["Free forever", "K-12 focus", "Practice exercises"]
    },
    {
      title: "FutureLearn",
      description: "Online courses and workshops from UK and international universities",
      url: "https://www.futurelearn.com",
      category: "Online Learning",
      features: ["Free access", "University partners", "Social learning"]
    },
    {
      title: "Udemy",
      description: "Workshops and courses on various topics",
      url: "https://www.udemy.com",
      category: "Various",
      features: ["Lifetime access", "Frequent sales", "Expert instructors"]
    },
    {
      title: "Codecademy",
      description: "Free interactive coding workshops",
      url: "https://www.codecademy.com",
      category: "Programming",
      features: ["Interactive", "Free tier", "Hands-on"]
    },
    {
      title: "freeCodeCamp",
      description: "Free coding workshops and certifications",
      url: "https://www.freecodecamp.org",
      category: "Programming",
      features: ["Free", "Certifications", "Projects"]
    },
    {
      title: "The Odin Project",
      description: "Free full-stack development workshops",
      url: "https://www.theodinproject.com",
      category: "Programming",
      features: ["Free", "Full curriculum", "Open source"]
    }
  ];

  const categories = [...new Set(workshops.map(w => w.category))];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Workshops & Learning
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Free and low-cost workshops, courses, and learning resources from leading institutions and companies.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaTools className="text-3xl text-purple-600 mx-auto mb-2" />
            <div className="font-semibold">Hands-on</div>
            <div className="text-sm text-gray-600">Practical learning</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaLaptop className="text-3xl text-purple-600 mx-auto mb-2" />
            <div className="font-semibold">Self-paced</div>
            <div className="text-sm text-gray-600">Learn at your pace</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaUsers className="text-3xl text-purple-600 mx-auto mb-2" />
            <div className="font-semibold">Community</div>
            <div className="text-sm text-gray-600">Learn together</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <FaCertificate className="text-3xl text-purple-600 mx-auto mb-2" />
            <div className="font-semibold">Certificates</div>
            <div className="text-sm text-gray-600">Earn recognition</div>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, index) => (
            <motion.a
              key={index}
              href={workshop.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition">
                  <FaTools className="text-2xl text-purple-600" />
                </div>
                <FaExternalLinkAlt className="text-gray-400 group-hover:text-purple-600 transition" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{workshop.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{workshop.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {workshop.features.map((feature, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
              <span className="inline-block px-3 py-1 bg-purple-50 text-sm text-purple-600 rounded-full">
                {workshop.category}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <h3 className="font-semibold text-lg mb-3">How to Get the Most from Workshops:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Set a schedule:</strong> Regular learning times help build momentum</li>
            <li>• <strong>Take notes:</strong> Document key concepts and insights</li>
            <li>• <strong>Practice:</strong> Apply what you learn in projects</li>
            <li>• <strong>Join communities:</strong> Connect with other learners for support</li>
            <li>• <strong>Earn certificates:</strong> Add completed workshops to your resume/LinkedIn</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> These are external links to workshop platforms. Free access varies by platform - 
            check each site for current offerings.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Workshops;