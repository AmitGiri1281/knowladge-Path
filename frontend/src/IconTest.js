// src/IconTest.js
import React from 'react';
import { 
  FaPaperPlane, 
  FaRobot, 
  FaTimes, 
  FaMinus, 
  FaBook, 
  FaSearch, 
  FaBars,
  FaArrowLeft,
  FaCheck,
  FaBookmark,
  FaShare,
  FaPlay,
  FaFileAlt,
  FaQuestionCircle
} from 'react-icons/fa';

const IconTest = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Icon Test</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <FaPaperPlane className="text-3xl mx-auto" />
          <p>FaPaperPlane</p>
        </div>
        <div className="text-center">
          <FaRobot className="text-3xl mx-auto" />
          <p>FaRobot</p>
        </div>
        <div className="text-center">
          <FaTimes className="text-3xl mx-auto" />
          <p>FaTimes</p>
        </div>
        <div className="text-center">
          <FaMinus className="text-3xl mx-auto" />
          <p>FaMinus</p>
        </div>
        <div className="text-center">
          <FaBook className="text-3xl mx-auto" />
          <p>FaBook</p>
        </div>
        <div className="text-center">
          <FaSearch className="text-3xl mx-auto" />
          <p>FaSearch</p>
        </div>
        <div className="text-center">
          <FaBars className="text-3xl mx-auto" />
          <p>FaBars</p>
        </div>
        <div className="text-center">
          <FaArrowLeft className="text-3xl mx-auto" />
          <p>FaArrowLeft</p>
        </div>
      </div>
    </div>
  );
};

export default IconTest;