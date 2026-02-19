import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';      // ADD THIS
import CategoryPage from './pages/CategoryPage';
import SectionPage from './pages/SectionPage';
import ContentPage from './pages/ContentPage';
import RecentPage from './pages/RecentPage';              // ADD THIS
import PopularPage from './pages/PopularPage';            // ADD THIS
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/categories" element={<CategoriesPage />} />        {/* ADD THIS */}
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/section/:id" element={<SectionPage />} />
              <Route path="/content/:id" element={<ContentPage />} />
              <Route path="/recent" element={<RecentPage />} />                 {/* ADD THIS */}
              <Route path="/popular" element={<PopularPage />} />               {/* ADD THIS */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;