import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaBook, FaChartLine } from 'react-icons/fa';

const Profile = () => {
  const { user, logout, fetchUserData } = useAuth(); // assume fetchUserData refreshes user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        await fetchUserData(); // fetch updated user info from backend
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Skeleton Loader */}
        <div className="animate-pulse h-64 bg-gray-200 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
        <div className="bg-white p-4 rounded-full">
          <FaUser className="text-4xl text-blue-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-blue-100 mt-1">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-100 mt-2">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl text-center shadow hover:shadow-lg transition">
          <FaBook className="text-3xl text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{user.coursesCompleted || 0}</div>
          <div className="text-gray-600 mt-1">Courses Completed</div>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl text-center shadow hover:shadow-lg transition">
          <FaChartLine className="text-3xl text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{user.learningHours || 0}</div>
          <div className="text-gray-600 mt-1">Learning Hours</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
        {user.recentActivity && user.recentActivity.length > 0 ? (
          user.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
              <div>
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.statusText}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  activity.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {activity.completed ? 'Completed' : `${activity.progress || 0}%`}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent activity yet.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center">
        <button
          onClick={logout}
          className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;