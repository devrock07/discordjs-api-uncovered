import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toc from './components/Toc';
import Home from './pages/Home';
import Nameplates from './pages/Nameplates';
import PlaceholderPage from './pages/PlaceholderPage';
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
            <Route path="/undocumented-apis" element={<PlaceholderPage title="Undocumented APIs" description="A collection of hidden endpoints discovered through reverse engineering." />} />
            <Route path="/rate-limits" element={<PlaceholderPage title="Rate Limits" description="Information on undocumented rate limits and bucket behaviors." />} />
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
