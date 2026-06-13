import React from 'react';
import { Link } from 'react-router-dom';

export default function RateLimits() {
  return (
    <main className="main-content">
        <span className="badge">Architecture</span>
        
        <h1 id="welcome">Rate Limits & Hidden Bans</h1>
        <p style={{fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '48px', letterSpacing: '-0.01em'}}>
            Understanding Discord's aggressive rate limiting architecture, missing headers, and Cloudflare bans.
        </p>

        <div className="callout" style={{borderLeftColor: '#ef4444', background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)', borderColor: 'rgba(239, 68, 68, 0.2)'}}>
            <div className="callout-title" style={{color: '#ef4444'}}>
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                Critical Warning
            </div>
            <p>Hitting undocumented rate limits repeatedly can result in an automatic, permanent IP ban by Cloudflare before your request even reaches Discord's internal servers.</p>
        </div>

        <h2 id="missing-headers">The Missing Headers Problem</h2>
        <p>
            Officially documented endpoints generally return useful <code>X-RateLimit-*</code> headers. These headers tell you your limit, how many requests remain in your bucket, and when the bucket resets.
        </p>
        <p>
            <strong>Undocumented endpoints frequently omit these headers.</strong> When interacting with hidden endpoints, you are often flying blind. You will not know you have hit a limit until you receive a <code>429 Too Many Requests</code> response.
        </p>

        <h2 id="handling-429">Handling 429 Responses</h2>
        <p>
            Because you cannot proactively calculate your limits on hidden endpoints, your application architecture MUST be built to elegantly handle HTTP 429 status codes.
        </p>
        <p>
            When Discord returns a 429, the JSON payload will include a <code>retry_after</code> field (the number of seconds you must wait).
        </p>
        <pre><code><span className="token punctuation">{'{'}</span>
    <span className="token property">"message"</span><span className="token punctuation">:</span> <span className="token string">"You are being rate limited."</span><span className="token punctuation">,</span>
    <span className="token property">"retry_after"</span><span className="token punctuation">:</span> <span className="token number">2.345</span><span className="token punctuation">,</span>
    <span className="token property">"global"</span><span className="token punctuation">:</span> <span className="token keyword">false</span>
<span className="token punctuation">{'}'}</span></code></pre>
        <p>
            You must pause all requests to that route for the exact duration of <code>retry_after</code>. Ignoring this and continuing to spam the endpoint will trigger an Invalid Request Ban.
        </p>

        <h2 id="global-limit">The Global Rate Limit</h2>
        <p>
            Regardless of individual route buckets, Discord enforces a strict global rate limit across your entire application. This limit is typically <strong>50 requests per second</strong>. 
        </p>
        <p>
            If you hit this limit, the 429 payload will have <code>"global": true</code>. All outbound requests from your bot must cease immediately until the timer expires.
        </p>

        <h2 id="cloudflare-bans">Cloudflare Invalid Request Bans</h2>
        <p>
            Discord uses Cloudflare to protect its infrastructure. Cloudflare monitors the amount of "Invalid Requests" your IP address generates. An invalid request includes:
        </p>
        <ul>
            <li>Hitting a 429 rate limit and continuing to send requests.</li>
            <li>Repeatedly hitting 401 (Unauthorized) or 403 (Forbidden) errors.</li>
            <li>Sending wildly malformed JSON payloads.</li>
        </ul>
        <p>
            If you send <strong>10,000 invalid requests within a 10-minute window</strong>, Cloudflare will permanently ban your IP address. You will instantly receive <code>1015 You are being rate limited</code> HTML pages instead of JSON, and your bot will go offline permanently on that host.
        </p>
        
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
