import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="main-content" style={{marginRight: 0}}>
        <span className="badge">Latest Feed</span>
        
        <h1 id="welcome">Unofficial API Updates</h1>
        <p style={{fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '48px', letterSpacing: '-0.01em'}}>
            The ultimate hub for documenting silent API changes, undocumented features, and hidden cosmetics that Discord doesn't tell you about.
        </p>

        <div className="grid-layout">
            <div className="grid-card" style={{borderLeft: '4px solid var(--accent)'}}>
                <h3>New Nameplate Endpoints <span>Just Now</span></h3>
                <p style={{fontSize: '0.95rem', marginTop: '12px'}}>
                    Discovered the exact payload structure required to assign Nameplates to bot accounts without Nitro entitlements.
                </p>
                <div style={{marginTop: '16px'}}>
                    <Link to="/nameplates" className="badge" style={{marginBottom: 0}}>Read Guide →</Link>
                </div>
            </div>

            <div className="grid-card">
                <h3>Avatar Decorations (Blocked) <span>2 days ago</span></h3>
                <p style={{fontSize: '0.95rem', marginTop: '12px'}}>
                    Confirmed that <code>avatar_decoration_sku_id</code> endpoints strictly enforce <code>COLLECTIBLES_NOT_OWNED</code> errors for bot accounts.
                </p>
            </div>
            
            <div className="grid-card">
                <h3>Profile Effects API <span>1 week ago</span></h3>
                <p style={{fontSize: '0.95rem', marginTop: '12px'}}>
                    <code>/users/@me/profile</code> is strictly restricted, actively rejecting connections from automated accounts attempting to apply profile effects.
                </p>
            </div>
        </div>

        <div className="footer">
            <div className="footer-top">
                <div>Stay tuned for more updates.</div>
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
