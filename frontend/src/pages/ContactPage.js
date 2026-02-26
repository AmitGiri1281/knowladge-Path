import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, 
  FaPaperPlane, FaGithub, FaTwitter, FaLinkedin, 
  FaCheckCircle, FaExclamationCircle, FaUser,
  FaGraduationCap, FaChalkboardTeacher, FaUsers,
  FaStar, FaCode, FaBook
} from 'react-icons/fa';
import api from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // You'll need to create this endpoint on your backend
      await api.post('/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const facultyMembers = [
    {
      initials: 'DK',
      name: 'Prof. Dinesh Kumar',
      role: 'Senior Professor & Head',
      department: 'Library and Information Science',
      expertise: 'Academic leadership, research supervision, and institutional vision',
      bgColor: 'from-purple-500 to-purple-600',
      icon: FaGraduationCap
    },
    {
      initials: 'SP',
      name: 'Prof. Shriram Pandey',
      role: 'Professor',
      department: 'Library and Information Science',
      expertise: 'Research mentorship, academic strategy',
      bgColor: 'from-indigo-500 to-indigo-600',
      icon: FaChalkboardTeacher
    },
    {
      initials: 'AK',
      name: 'Dr. Amit Kumar',
      role: 'Assistant Professor',
      department: 'Library and Information Science',
      expertise: 'Technical mentorship, system development',
      bgColor: 'from-blue-500 to-blue-600',
      icon: FaGraduationCap
    },
    {
      initials: 'SD',
      name: 'Ms. Sushree Snigdha Dandpat',
      role: 'Guest Faculty',
      department: 'Library and Information Science',
      expertise: 'Academic support, research resources, and knowledge curation',
      bgColor: 'from-green-500 to-green-600',
      icon: FaChalkboardTeacher
    }
  ];

  // Team Members Data
  const teamMembers = [
    {
      initials: 'VN',
      name: 'Vaishnabee',
      role: 'Team Leader',
      program: 'M.Lib.Sc (2nd Year)',
      expertise: 'Project coordination, research methodology, and team management',
      bgColor: 'from-amber-500 to-orange-500',
      icon: FaStar,
      highlight: true
    },
    {
      initials: 'MS',
      name: 'Manish',
      role: 'Designer',
      program: 'M.Lib.Sc (2nd Year)',
      expertise: 'UI/UX design, content organization, and visual communication',
      bgColor: 'from-teal-500 to-cyan-500',
      icon: FaCode,
      highlight: false
    },
    {
      initials: 'MN',
      name: 'Moon',
      role: 'Team Member',
      program: 'M.Lib.Sc (2nd Year)',
      expertise: 'Research support, data organization, and user assistance',
      bgColor: 'from-rose-500 to-pink-500',
      icon: FaBook,
      highlight: false
    }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'Email Us',
      details: ['support@knowledgepathway.com', 'info@knowledgepathway.com'],
      link: 'mailto:support@knowledgepathway.com'
    },
    {
      icon: FaPhone,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: 'tel:+15551234567'
    },
    {
      icon: FaMapMarkerAlt,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      title: 'Visit Us',
      details: ['Central University of Haryana', 'Mahendragh, Haryana - 123456'],
      link: 'https://maps.google.com/?q=Central+University+of+Haryana'
    },
    {
      icon: FaClock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      title: 'Working Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed'],
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full opacity-10"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Have questions about our courses, research opportunities, or partnerships? 
              We're here to help you on your knowledge journey.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${info.bgColor} p-3 rounded-xl`}>
                    <info.icon className={`text-2xl ${info.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                    {info.link && (
                      <a 
                        href={info.link}
                        className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-block font-medium"
                      >
                        Click to connect →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <p className="text-white/90 mb-6 text-sm">
                Follow us on social media for updates on courses, research, and events.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
                  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
                  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                    aria-label={social.label}
                  >
                    <social.icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {/* Status Messages */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <FaCheckCircle className="text-xl" />
                  ) : (
                    <FaExclamationCircle className="text-xl" />
                  )}
                  <span>
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! We\'ll respond shortly.' 
                      : 'Failed to send message. Please try again.'}
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Faculty & Research Mentors Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Faculty & Research Mentors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is guided by experienced faculty members and academic leaders
              who are committed to fostering research, innovation, and knowledge development.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {facultyMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${member.bgColor} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className={`relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${member.bgColor} rounded-2xl rotate-45 group-hover:rotate-0 transition-all duration-300`}>
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-300">
                      <span className="text-2xl font-bold text-white">{member.initials}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.department}</p>
                  
                  <p className="text-sm text-gray-600 border-t border-gray-100 pt-3">
                    {member.expertise}
                  </p>

                  <div className="mt-4 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                      Mentor
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Student Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
              <FaUsers className="text-2xl text-amber-600 mx-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Student Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated students from M.Lib.Sc program who are working tirelessly 
              to make Knowledge Pathway a valuable resource for everyone.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Highlight border for team leader */}
                {member.highlight && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                )}
                
                <div className={`relative bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 ${
                  member.highlight ? 'border-2 border-amber-400' : ''
                }`}>
                  {/* Decorative background */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${member.bgColor} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  
                  {/* Avatar with gradient */}
                  <div className={`relative w-28 h-28 mx-auto mb-6 bg-gradient-to-br ${member.bgColor} rounded-full p-1 shadow-lg`}>
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-700">{member.initials}</span>
                    </div>
                    
                    {/* Role indicator icon */}
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br ${member.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
                      <member.icon className="text-white text-sm" />
                    </div>
                  </div>

                  {/* Name and role */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className={`font-semibold mb-2 ${
                    member.highlight ? 'text-amber-600' : 'text-purple-600'
                  }`}>
                    {member.role}
                  </p>
                  
                  <p className="text-sm text-gray-500 mb-3">
                    {member.program}
                  </p>
                  
                  <p className="text-sm text-gray-600 border-t border-gray-100 pt-3">
                    {member.expertise}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      member.highlight 
                        ? 'bg-amber-100 text-amber-600' 
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      M.Lib.Sc
                    </span>
                    {member.highlight && (
                      <span className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full">
                        Team Lead
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <p className="text-gray-700">
                <span className="font-semibold text-purple-600">Vaishnabee</span> leads our talented student team, 
                with <span className="font-semibold text-purple-600">Manish</span> handling design and 
                <span className="font-semibold text-purple-600"> Moon</span> providing research support. 
                Together, they're building resources that benefit the entire academic community.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-1 p-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <h3 className="text-2xl font-bold mb-4">Visit Our Campus</h3>
                <p className="text-white/90 mb-6">
                  We're located at the Central University of Haryana campus. 
                  Feel free to visit us during working hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-xl" />
                    <span>Central University of Haryana, Mahendragh</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-xl" />
                    <span>Mon-Fri: 9AM - 6PM</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 h-96 md:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.449888425207!2d76.15765731440793!3d28.61393978241398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e2c6b6f3f9f%3A0x8b6f9f9f9f9f9f9f!2sCentral%20University%20of%20Haryana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="University Location Map"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How quickly do you respond to inquiries?",
                a: "We typically respond within 24 hours during business days."
              },
              {
                q: "Do you offer research collaboration opportunities?",
                a: "Yes, we actively collaborate with researchers. Contact us with your proposal."
              },
              {
                q: "Can I schedule a campus visit?",
                a: "Absolutely! Contact us to arrange a guided tour of our facilities."
              },
              {
                q: "Are there online consultation options?",
                a: "Yes, we offer virtual meetings via video conferencing."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;