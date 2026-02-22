import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft, FaCheck, FaBookmark, FaShare } from 'react-icons/fa';
import api from '../services/api'; // <-- use your centralized api

const ContentPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('theory');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    fetchContent();
  }, [id]);
const fetchContent = async () => {
  try {
    setLoading(true);
    const response = await api.get(`/content/${id}`); // <-- use api instance
    setContent(response.data);
  } catch (error) {
    console.error('Error fetching content:', error);
  } finally {
    setLoading(false);
  }
};
  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const checkQuizAnswer = (questionIndex) => {
    const isCorrect = quizAnswers[questionIndex] === content.quiz[questionIndex].correctAnswer;
    setQuizResults({
      ...quizResults,
      [questionIndex]: isCorrect
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!content) {
    return <div className="text-center text-red-600">Content not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to={`/section/${content.sectionId?._id}`} className="flex items-center space-x-1 hover:text-blue-600">
          <FaArrowLeft className="text-xs" />
          <span>Back to Section</span>
        </Link>
      </div>

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        {content.title}
      </motion.h1>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <FaCheck />
          <span>Mark Complete</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          <FaBookmark />
          <span>Save</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
          <FaShare />
          <span>Share</span>
        </button>
      </div>

      {/* Video Section */}
    {content.videoUrl && (
  <div className="bg-black rounded-lg overflow-hidden aspect-video">
  <ReactPlayer
  url={content.videoUrl}
  width="100%"
  height="100%"
  controls
  config={{
    youtube: {
      playerVars: {
        showinfo: 1,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin, // ✅ important for localhost
      }
    }
  }}
/>
  </div>
)}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('theory')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'theory'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Theory
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notes
          </button>
          {content.quiz?.length > 0 && (
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'quiz'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quiz
            </button>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {activeTab === 'theory' && (
          <div className="prose max-w-none">
            <ReactMarkdown>{content.theory}</ReactMarkdown>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="prose max-w-none">
            <ReactMarkdown>{content.notes}</ReactMarkdown>
          </div>
        )}

        {activeTab === 'quiz' && content.quiz?.length > 0 && (
          <div className="space-y-8">
            {content.quiz.map((question, qIndex) => (
              <div key={qIndex} className="border-b pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Question {qIndex + 1}: {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition ${
                        quizAnswers[qIndex] === oIndex
                          ? quizResults[qIndex] !== undefined
                            ? quizResults[qIndex]
                              ? 'bg-green-100 border-green-500'
                              : 'bg-red-100 border-red-500'
                            : 'bg-blue-100 border-blue-500'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        checked={quizAnswers[qIndex] === oIndex}
                        onChange={() => handleQuizAnswer(qIndex, oIndex)}
                        className="w-4 h-4 text-blue-600"
                        disabled={quizResults[qIndex] !== undefined}
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                
                {quizResults[qIndex] !== undefined ? (
                  <div className={`mt-4 p-4 rounded-lg ${
                    quizResults[qIndex] ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <p className="font-medium mb-2">
                      {quizResults[qIndex] ? '✅ Correct!' : '❌ Incorrect'}
                    </p>
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => checkQuizAnswer(qIndex)}
                    disabled={quizAnswers[qIndex] === undefined}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resources */}
      {content.resources?.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="bg-blue-100 p-2 rounded-lg">
                  {resource.type === 'pdf' ? '📄' : 
                   resource.type === 'code' ? '💻' : '🔗'}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{resource.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;