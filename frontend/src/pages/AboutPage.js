import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaUsers, FaGlobe, FaHeart, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Knowledge PathWay</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Empowering learners worldwide with free, accessible, and quality educational resources
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              Knowledge PathWay was founded with a simple yet powerful mission: to democratize education 
              and make quality learning materials accessible to everyone, anywhere, at any time.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We believe that knowledge should not be confined by geographical boundaries, economic 
              barriers, or institutional limitations. Our platform brings together diverse educational 
              resources from around the world, curated and organized to create meaningful learning paths.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500 text-2xl" />
                <span className="text-gray-700">Community Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGlobe className="text-blue-500 text-2xl" />
                <span className="text-gray-700">Global Access</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" 
              alt="Students learning together"
              className="rounded-lg mb-6"
            />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600">Learning Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-gray-600">Active Learners</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBook className="text-4xl text-blue-600" />,
                title: "Quality Content",
                description: "We carefully curate and verify all educational materials to ensure high-quality learning experiences."
              },
              {
                icon: <FaUsers className="text-4xl text-green-600" />,
                title: "Inclusive Community",
                description: "We foster a diverse and inclusive environment where everyone feels welcome to learn and grow."
              },
              {
                icon: <FaLightbulb className="text-4xl text-yellow-600" />,
                title: "Innovation",
                description: "We continuously innovate to provide better learning tools and experiences for our users."
              },
              {
                icon: <FaHandsHelping className="text-4xl text-purple-600" />,
                title: "Collaboration",
                description: "We believe in the power of collaborative learning and community contribution."
              },
              {
                icon: <FaGlobe className="text-4xl text-indigo-600" />,
                title: "Global Reach",
                description: "We strive to make education accessible to learners across all geographical boundaries."
              },
              {
                icon: <FaHeart className="text-4xl text-red-600" />,
                title: "Passion for Learning",
                description: "We are driven by a genuine passion for knowledge and continuous learning."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;