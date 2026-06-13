import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toc from './components/Toc';
import Home from './pages/Home';
import Nameplates from './pages/Nameplates';
import UndocumentedApis from './pages/UndocumentedApis';
import RateLimits from './pages/RateLimits';
import PlaceholderPage from './pages/PlaceholderPage';
import RichPresence from './pages/RichPresence';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showToc = location.pathname === '/nameplates';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll to top and close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="layout-container">
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nameplates" element={<Nameplates />} />
            <Route path="/avatar-decorations" element={<PlaceholderPage title="Avatar Decorations" description="Documentation for the avatar decoration endpoints and bypass attempts." />} />
            <Route path="/profile-effects" element={<PlaceholderPage title="Profile Effects" description="Details on profile effect IDs and payload structures." />} />
            <Route path="/undocumented-apis" element={<UndocumentedApis />} />
            <Route path="/rate-limits" element={<RateLimits />} />
            <Route path="/rich-presence" element={<RichPresence />} />
        </Routes>
        {showToc && <Toc />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
