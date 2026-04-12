// App.jsx - Main Application Entry Point with Authentication
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import GalleryPage from './pages/GalleryPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminAuth from './pages/AdminAuth';
import ProtectedRoute from './components/ProtectedRoute';
import AllEventsPage from './pages/AllEventsPage';
import NewsCareerPage from './pages/NewsCareerPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes - No Navbar/Footer */}
        <Route path="/login" element={<AdminAuth />} />
        <Route path="/signup" element={<AdminAuth />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/all-events" element={<AllEventsPage />} />
        
        
        {/* Protected Admin Route - No Navbar/Footer */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Public Routes with Navbar and Footer */}
        <Route path="/" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <HomePage />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/about" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AboutPage />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/projects" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <ProjectsPage />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/events" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <EventsPage />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/events/:id" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <EventDetailPage />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/gallery" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <GalleryPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/news-career" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <NewsCareerPage />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/contact" element={
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <ContactPage />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;