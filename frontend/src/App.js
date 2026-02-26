import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import SectionPage from './pages/SectionPage';
import ContentPage from './pages/ContentPage';
import RecentPage from './pages/RecentPage';
import PopularPage from './pages/PopularPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Import Resource Pages
import Resources from './pages/Resources';
import Books from './pages/Books';
import Journals from './pages/Journals';
import NewsMagazines from './pages/NewsMagazines';
import Workshops from './pages/Workshops';
import Conferences from './pages/Conferences';
import Videos from './pages/Videos';

// Import About Pages (Add these imports)
import AboutPage from './pages/AboutPage';
import AimsPage from './pages/AimsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/section/:id" element={<SectionPage />} />
              <Route path="/content/:id" element={<ContentPage />} />
              <Route path="/recent" element={<RecentPage />} />
              <Route path="/popular" element={<PopularPage />} />
              
              {/* About Routes - Add these new routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/aims" element={<AimsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Resource Routes */}
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/books" element={<Books />} />
              <Route path="/resources/journals" element={<Journals />} />
              <Route path="/resources/news" element={<NewsMagazines />} />
              <Route path="/resources/workshops" element={<Workshops />} />
              <Route path="/resources/conferences" element={<Conferences />} />
              <Route path="/resources/videos" element={<Videos />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes (Require Login) */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Admin Route - Also Protected */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              
              {/* Optional: Add a 404 route for any undefined paths */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8">Page not found</p>
                    <a href="/" className="text-blue-600 hover:text-blue-700 underline">Go back home</a>
                  </div>
                </div>
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