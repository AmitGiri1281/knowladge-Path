import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaRocket, FaChartLine, FaHandsHelping, FaGraduationCap } from 'react-icons/fa';

const AimsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Aims & Goals</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Charting the course for a more educated and empowered global community
            </p>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <FaEye className="text-5xl text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 mb-4">
              To create a world where quality education is not a privilege but a fundamental right 
              accessible to every individual, regardless of their circumstances.
            </p>
            <div className="border-t pt-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaBullseye className="text-green-500" />
                <span>Empowering 1 million learners by 2026</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Vision illustration"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>

        {/* Aims Grid */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Primary Aims</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FaGraduationCap className="text-4xl text-blue-600" />,
              title: "Accessibility First",
              description: "Make educational resources accessible to learners in remote and underserved areas through our digital platform.",
              progress: "75%"
            },
            {
              icon: <FaChartLine className="text-4xl text-green-600" />,
              title: "Continuous Growth",
              description: "Expand our resource library to cover 50+ subjects and 1000+ topics by the end of next year.",
              progress: "60%"
            },
            {
              icon: <FaRocket className="text-4xl text-purple-600" />,
              title: "Innovation in Learning",
              description: "Implement AI-powered personalized learning paths to enhance the educational experience.",
              progress: "40%"
            },
            {
              icon: <FaHandsHelping className="text-4xl text-orange-600" />,
              title: "Community Engagement",
              description: "Build a community of 10,000+ active contributors who help curate and improve content.",
              progress: "55%"
            },
            {
              icon: <FaBullseye className="text-4xl text-red-600" />,
              title: "Quality Assurance",
              description: "Establish a rigorous review system to maintain 99.9% accuracy in all educational content.",
              progress: "80%"
            },
            {
              icon: <FaEye className="text-4xl text-indigo-600" />,
              title: "Global Recognition",
              description: "Partner with educational institutions worldwide to provide certified learning paths.",
              progress: "35%"
            }
          ].map((aim, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center space-x-3 mb-4">
                {aim.icon}
                <h3 className="text-xl font-semibold text-gray-800">{aim.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{aim.description}</p>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{aim.progress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2" 
                    style={{ width: aim.progress }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Roadmap</h2>
          <div className="space-y-8">
            {[
              {
                year: "2024",
                goals: ["Launch mobile app", "Add 5000+ new resources", "Reach 100k users"]
              },
              {
                year: "2025",
                goals: ["Implement AI learning paths", "Partner with 50 universities", "Launch certification program"]
              },
              {
                year: "2026",
                goals: ["Reach 1 million learners", "Add 20+ languages", "Establish global learning centers"]
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col md:flex-row gap-4 items-start"
              >
                <div className="md:w-32 text-2xl font-bold text-blue-600">{phase.year}</div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-2">
                      {phase.goals.map((goal, idx) => (
                        <li key={idx} className="text-gray-700">{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AimsPage;