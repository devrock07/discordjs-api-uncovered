import React from 'react';

export default function Nameplates() {
  return (
    <main className="main-content">
        <span className="badge">Guide v14.x</span>
        
        <h1 id="welcome">How Discord Nameplates Work</h1>
        <p style={{fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '48px', letterSpacing: '-0.01em'}}>An overview of display name styling capabilities for bot accounts.</p>
        
        <h2 id="overview">Overview & Mechanism</h2>
        <p>
            Discord's <strong>Nameplate</strong> feature (referred to internally as <strong>Display Name Styles</strong>) allows guild profiles to customize the way a user's display name is styled and formatted inside a specific server.
        </p>
        <p>
            Unlike global cosmetics such as avatar decorations or profile effects which are tied to user store items and Nitro entitlements, nameplates are structured as a set of direct member profile metadata fields. Because these parameters do not require a backend ownership check (entitlements validation) or a Nitro purchase, standard Discord bot accounts can natively apply custom display name styles to themselves.
        </p>

        <h2 id="how-it-works">How It Works under the Hood</h2>
        <p>
            When you run the <code>namestyle</code> command, the bot makes a direct HTTP <code>PATCH</code> request to the Discord API endpoint <code>/guilds/{'{guild_id}'}/members/@me</code>. This is the server-specific profile modification endpoint where the bot can change its nickname, server-specific avatar, banner, bio, and nameplate details.
        </p>
        <p>
            The body of the payload accepts three primary nameplate fields:
        </p>

        <pre><code><span className="token keyword">await</span> client<span className="token punctuation">.</span>rest<span className="token punctuation">.</span><span className="token function">patch</span><span className="token punctuation">(</span>Routes<span className="token punctuation">.</span><span className="token function">guildMember</span><span className="token punctuation">(</span>guildId<span className="token punctuation">,</span> <span className="token string">"@me"</span><span className="token punctuation">)</span><span className="token punctuation">,</span> <span className="token punctuation">{'{'}</span>
    <span className="token property">body</span><span className="token punctuation">:</span> <span className="token punctuation">{'{'}</span>
        <span className="token property">display_name_font_id</span><span className="token punctuation">:</span> fontId<span className="token punctuation">,</span>        <span className="token comment">// Numeric ID representing the selected font style</span>
        <span className="token property">display_name_effect_id</span><span className="token punctuation">:</span> effectId<span className="token punctuation">,</span>    <span className="token comment">// Numeric ID representing the text effect</span>
        <span className="token property">display_name_colors</span><span className="token punctuation">:</span> colors          <span className="token comment">// Array containing 1 or 2 decimal representation of hex colors</span>
    <span className="token punctuation">{'}'}</span>
<span className="token punctuation">{'}'}</span><span className="token punctuation">)</span><span className="token punctuation">;</span></code></pre>

        <div className="callout">
            <div className="callout-title">
                <svg viewBox="0 0 24 24"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
                API Tip on Hex Colors
            </div>
            <p>Discord expects display colors as decimal integers rather than typical Hex strings. The command translates hex codes like <code>#FF0000</code> to their corresponding base-10 numerical values (e.g., <code>16711680</code>) before making the API request.</p>
        </div>

        <h2 id="supported-options">Supported Customization Options</h2>
        <p>
            The bot's command maps user-friendly names to the corresponding IDs accepted by the Discord API:
        </p>

        <div className="grid-layout">
            <div className="grid-card">
                <h3>Fonts <span>ID</span></h3>
                <ul className="spec-list">
                    <li><span>default</span> <span className="value">11</span></li>
                    <li><span>tempo</span> <span className="value">1</span></li>
                    <li><span>sakura</span> <span className="value">3</span></li>
                    <li><span>jellybean</span> <span className="value">4</span></li>
                    <li><span>modern</span> <span className="value">6</span></li>
                    <li><span>8bit</span> <span className="value">8</span></li>
                    <li><span>vampyre</span> <span className="value">10</span></li>
                    <li><span>medieval</span> <span className="value">7</span></li>
                </ul>
            </div>
            <div className="grid-card">
                <h3>Effects <span>ID</span></h3>
                <ul className="spec-list">
                    <li><span>solid</span> <span className="value">1</span></li>
                    <li><span>gradient</span> <span className="value">2</span></li>
                    <li><span>neon</span> <span className="value">3</span></li>
                    <li><span>toon</span> <span className="value">4</span></li>
                    <li><span>pop</span> <span className="value">5</span></li>
                    <li><span>glow</span> <span className="value">6</span></li>
                </ul>
            </div>
        </div>

        <h2 id="why-others-fail">Why Other Cosmetics Fail</h2>
        <p>
            While Nameplates are open to bot customization, <strong>Avatar Decorations</strong> (e.g. <code>avatar_decoration_sku_id</code>) and <strong>Profile Effects</strong> (e.g. <code>profile_effect_id</code>) fail when sent from a bot account.
        </p>
        <p>
            Avatar decorations are catalog items managed by Discord's Shop. The API runs a backend inventory check on the calling account; if the account does not "own" the item's digital entitlement (which is impossible for bot accounts to claim or buy), the API rejects the update with a <code>COLLECTIBLES_NOT_OWNED</code> error. Similarly, profile effects are strictly restricted to the user settings endpoint (<code>/users/@me/profile</code>), which outright blocks bot accounts from connecting.
        </p>
        
        <div className="footer">
            <div className="footer-top">
                <div>Last updated: Just now</div>
                <div><a href="#" style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Edit this page on GitHub
                </a></div>
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
