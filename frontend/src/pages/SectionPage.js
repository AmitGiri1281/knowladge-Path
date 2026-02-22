import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaFileAlt, FaQuestionCircle } from 'react-icons/fa';
import api from '../services/api';

const SectionPage = () => {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [contents, setContents] = useState([]);
  const [relatedSections, setRelatedSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch section data
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        setLoading(true);
        const [sectionRes, contentsRes] = await Promise.all([
          api.get(`/sections/${id}`),
          api.get(`/content/section/${id}`)
        ]);

        setSection(sectionRes.data);
        setContents(contentsRes.data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Status:', error.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [id]);

  // Fetch related sections after section loads
  useEffect(() => {
    const fetchRelatedSections = async () => {
      if (!section) return;
      try {
        const res = await api.get(`/sections/related/${section.categoryId?._id}`);
        setRelatedSections(res.data);
      } catch (error) {
        console.error('Error fetching related sections:', error);
      }
    };

    fetchRelatedSections();
  }, [section]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!section) {
    return <div className="text-center text-red-600">Section not found</div>;
  }

  // Calculate user progress dynamically
  const completedTopics = contents.filter(c => c.completed).length;
  const progressPercent = contents.length ? (completedTopics / contents.length) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link to={`/category/${section.categoryId?._id}`} className="hover:text-blue-600">
            {section.categoryId?.name}
          </Link>
          <span>→</span>
          <span className="text-gray-800">{section.name}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{section.name}</h1>
        <p className="text-xl text-gray-600">{section.description}</p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Topics</h2>
          {contents.map((content, index) => (
            <motion.div
              key={content._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/content/${content._id}`}>
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      {index === 0 ? <FaPlay className="text-blue-600" /> : 
                       index === 1 ? <FaFileAlt className="text-blue-600" /> : 
                       <FaQuestionCircle className="text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{content.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{content.theory?.substring(0, 150)}...</p>
                      <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                        {content.videoUrl && <span>🎥 Video</span>}
                        {content.notes && <span>📝 Notes</span>}
                        {content.quiz?.length > 0 && <span>📊 Quiz</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <p className="text-sm text-gray-600">{progressPercent.toFixed(0)}% complete ({completedTopics}/{contents.length} topics)</p>
          </div>

          {/* Resources Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Section Resources</h3>
            <ul className="space-y-2">
              {section.resources?.map((res, i) => (
                <li key={i} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                  <FaFileAlt className="text-sm" />
                  <span>{res.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Sections */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Sections</h3>
            <ul className="space-y-2">
              {relatedSections.map(rs => (
                <li key={rs._id} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                  {rs.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;