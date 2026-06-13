import React from 'react';
import { Link } from 'react-router-dom';

export default function UndocumentedApis() {
  return (
    <main className="main-content">
        <span className="badge">Catalog</span>
        
        <h1 id="welcome">Undocumented APIs</h1>
        <p style={{fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '48px', letterSpacing: '-0.01em'}}>
            A catalog of hidden endpoints discovered through client reverse-engineering.
        </p>

        <div className="callout" style={{borderLeftColor: '#ef4444', background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)', borderColor: 'rgba(239, 68, 68, 0.2)'}}>
            <div className="callout-title" style={{color: '#ef4444'}}>
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                TOS Warning
            </div>
            <p>Using undocumented API routes is strictly against Discord's Developer Terms of Service. These endpoints can change without warning, and abusing them (especially User-only endpoints) will result in immediate bot termination.</p>
        </div>

        <h2 id="relationships">Relationship Management</h2>
        <p>
            Discord's relationship endpoints (managing Friends and Blocked Users) are strictly undocumented and intended solely for the official client.
        </p>
        <pre><code><span className="token comment">// Add Friend / Send Friend Request</span>
<span className="token function">PUT</span> /users/@me/relationships/<span className="token punctuation">{'{'}</span>user_id<span className="token punctuation">{'}'}</span>

<span className="token comment">// Remove Friend / Unblock</span>
<span className="token function">DELETE</span> /users/@me/relationships/<span className="token punctuation">{'{'}</span>user_id<span className="token punctuation">{'}'}</span></code></pre>
        <p>
            <strong>Note for Bot Accounts:</strong> Standard bot accounts cannot utilize these endpoints. Any attempt to hit these routes will return a <code>403 Forbidden</code> or <code>401 Unauthorized</code>. These endpoints are heavily monitored for Self-Botting abuse.
        </p>

        <h2 id="user-profile">Full User Profiles</h2>
        <p>
            While <code>/users/{'{'}user_id{'}'}</code> is documented, there is a hidden, richer endpoint used by the client when you click on someone's profile.
        </p>
        <pre><code><span className="token function">GET</span> /users/<span className="token punctuation">{'{'}</span>user_id<span className="token punctuation">{'}'}</span>/profile</code></pre>
        <p>
            This endpoint returns extended profile information, including Premium Since dates, Mutual Friends, Mutual Guilds, and User Notes. Because it performs expensive database queries for mutual relationships, this endpoint has an incredibly strict, unlisted rate limit. Scraping this endpoint is a fast track to a Cloudflare ban.
        </p>

        <h2 id="guild-cosmetics">Hidden Guild Profile Parameters</h2>
        <p>
            As discussed in our <Link to="/nameplates">Nameplates Guide</Link>, the <code>PATCH /guilds/{'{'}guild_id{'}'}/members/@me</code> endpoint accepts several undocumented fields.
        </p>
        
        <div className="grid-layout">
            <div className="grid-card">
                <h3><code>avatar_decoration_sku_id</code></h3>
                <p style={{fontSize: '0.95rem', marginTop: '12px'}}>
                    Requires an exact string ID of a store cosmetic. Banned for bot accounts due to internal entitlement checks returning <code>COLLECTIBLES_NOT_OWNED</code>.
                </p>
            </div>
            <div className="grid-card">
                <h3><code>theme_colors</code></h3>
                <p style={{fontSize: '0.95rem', marginTop: '12px'}}>
                    An array of two integer colors <code>[primary, accent]</code> used for custom profile themes. Officially requires Nitro, but bugs have historically allowed bypassing this.
                </p>
            </div>
        </div>

        <div className="footer">
            <div className="footer-top">
                <div>Last updated: Just now</div>
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
