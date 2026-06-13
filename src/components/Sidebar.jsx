import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-section">
                <div className="sidebar-title">Feed</div>
                <ul className="sidebar-nav">
                    <li><NavLink to="/" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Latest Updates</NavLink></li>
                </ul>
            </div>
            <div className="sidebar-section">
                <div className="sidebar-title">Cosmetics</div>
                <ul className="sidebar-nav">
                    <li><NavLink to="/nameplates" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Nameplates</NavLink></li>
                    <li><NavLink to="/avatar-decorations" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Avatar Decorations</NavLink></li>
                    <li><NavLink to="/profile-effects" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Profile Effects</NavLink></li>
                </ul>
            </div>
            <div className="sidebar-section">
                <div className="sidebar-title">Endpoints</div>
                <ul className="sidebar-nav">
                    <li><NavLink to="/undocumented-apis" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Undocumented APIs</NavLink></li>
                    <li><NavLink to="/rate-limits" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Rate Limits</NavLink></li>
                    <li><NavLink to="/rich-presence" onClick={closeSidebar} className={({isActive}) => isActive ? "active" : ""}>Rich Presence</NavLink></li>
                </ul>
            </div>
        </aside>
        {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
}
