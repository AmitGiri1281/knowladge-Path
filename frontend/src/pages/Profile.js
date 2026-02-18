import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaBook, FaChartLine } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-4 rounded-full">
              <FaUser className="text-4xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-blue-100">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaUser className="text-blue-600" />
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaEnvelope className="text-blue-600" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FaCalendar className="text-blue-600" />
                  <span>Joined: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Learning Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <FaBook className="text-2xl text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <FaChartLine className="text-2xl text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Introduction to Programming</h3>
                  <p className="text-sm text-gray-600">Completed 2 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Completed</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Variables and Data Types</h3>
                  <p className="text-sm text-gray-600">In progress</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">75%</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8">
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;