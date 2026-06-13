import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  return (
    <header className="header">
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <Link to="/" className="logo">
                <div className="logo-icon" style={{backgroundImage: 'url("https://avatars.githubusercontent.com/u/114628634?s=400&u=ac287ba7ee2145ce6c07a9b3b6717d519fae24b3&v=4")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'transparent', boxShadow: 'none'}}></div>
                Unofficial API Updates
            </Link>
        </div>
        <div className="nav-links">
            <Link to="/">Feed</Link>
            <Link to="/nameplates">Guides</Link>
            <a href="https://github.com/devrock07/discordjs-api-uncovered" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
    </header>
  );
}
