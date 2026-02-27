import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaFileAlt, FaQuestionCircle, FaBook } from 'react-icons/fa';
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
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [id]);

  // Fetch related sections using category endpoint
  useEffect(() => {
    const fetchRelatedSections = async () => {
      if (!section || !section.categoryId?._id) return;
      
      try {
        const res = await api.get(`/sections/category/${section.categoryId._id}`);
        const otherSections = res.data.filter(s => s._id !== section._id).slice(0, 3);
        setRelatedSections(otherSections);
      } catch (error) {
        console.error('Error fetching related sections:', error);
        setRelatedSections([]);
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

  const hasContent = contents.length > 0;

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
          
          {hasContent ? (
            contents.map((content, index) => (
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
            ))
          ) : (
            // Show empty state
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FaBook className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Topics Yet</h3>
              <p className="text-gray-500 mb-6">
                This section doesn't have any content at the moment.
              </p>
              <Link
                to={`/category/${section.categoryId?._id}`}
                className="text-blue-600 hover:underline"
              >
                ← Back to {section.categoryId?.name}
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card - Only show if there's content */}
          {hasContent && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-sm text-gray-600">0% complete (0/{contents.length} topics)</p>
            </div>
          )}

          {/* External Resources Suggestion */}
          {!hasContent && (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Looking for Resources?</h3>
              <p className="text-sm text-gray-600 mb-4">
                While we prepare content for this section, check out these external resources:
              </p>
              <div className="space-y-2">
                <Link
                  to="/resources/books"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">📚</span>
                    <span className="font-medium">External eBooks</span>
                  </span>
                  <span className="text-xs text-green-600">External</span>
                </Link>
                <Link
                  to="/resources/journals"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">📓</span>
                    <span className="font-medium">External Journals</span>
                  </span>
                  <span className="text-xs text-green-600">External</span>
                </Link>
                <Link
                  to="/resources/jobs"
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">💼</span>
                    <span className="font-medium">Job Listings</span>
                  </span>
                  <span className="text-xs text-green-600">External</span>
                </Link>
              </div>
            </div>
          )}

          {/* Related Sections - Only show if they exist */}
          {relatedSections.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Sections</h3>
              <ul className="space-y-2">
                {relatedSections.map(rs => (
                  <li key={rs._id}>
                    <Link 
                      to={`/section/${rs._id}`}
                      className="text-gray-600 hover:text-blue-600 cursor-pointer block py-1 hover:translate-x-1 transition"
                    >
                      {rs.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionPage;