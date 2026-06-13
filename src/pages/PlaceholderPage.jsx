import React from 'react';

export default function PlaceholderPage({ title, description }) {
  return (
    <main className="main-content">
        <span className="badge">Work in Progress</span>
        <h1>{title}</h1>
        <p style={{fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '48px'}}>{description}</p>
        
        <div className="callout" style={{borderLeftColor: '#f59e0b', background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)', borderColor: 'rgba(245, 158, 11, 0.2)'}}>
            <div className="callout-title" style={{color: '#f59e0b'}}>
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                Documentation Pending
            </div>
            <p>Our researchers are currently reverse-engineering this feature. Full documentation will be published here shortly. Stay tuned!</p>
        </div>
        
        <div className="footer">
            <div className="footer-top">
                <div>Last updated: Pending</div>
            </div>
            <div style={{marginTop: '24px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                <a href="https://github.com/devrock07" target="_blank" rel="noopener noreferrer" className="dev-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    Created by <span>devrock07</span>
                </a>
            </div>
        </div>
    </main>
  );
}
