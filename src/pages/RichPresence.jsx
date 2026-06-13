import React from 'react';

export default function RichPresence() {
  return (
    <main className="main-content">
        <span className="badge">Feature</span>
        
        <h1 id="welcome">Rich Presence & RPC Status</h1>
        <p style={{fontSize: '1.25rem', color: '#a1a1aa', marginBottom: '48px', letterSpacing: '-0.01em'}}>
            Learn how to display custom status, current activities, and connect using Discord IPC/RPC.
        </p>

        <h2 id="what-is-rpc">What is RPC?</h2>
        <p>
            Discord Rich Presence (RPC) allows your application to communicate with the local Discord client via Inter-Process Communication (IPC). This enables you to display detailed information on a user's profile, such as the current game they're playing, elapsed time, or custom images.
        </p>

        <div className="callout" style={{borderLeftColor: '#10b981', background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)', borderColor: 'rgba(16, 185, 129, 0.2)'}}>
            <div className="callout-title" style={{color: '#10b981'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Pro Tip
            </div>
            <p>You can use the <code>discord-rpc</code> library to easily set up your presence without manually handling IPC sockets.</p>
        </div>

        <h2 id="activity-types">Activity Types (discord.js)</h2>
        <p>
            When setting your bot's presence using discord.js, you can choose from several <code>ActivityType</code>s to customize what the bot is doing:
        </p>
        <div className="grid-layout" style={{marginBottom: '24px'}}>
            <div className="grid-card">
                <h3>Playing <span>ActivityType.Playing</span></h3>
                <p>Displays as "Playing [Game]"</p>
            </div>
            <div className="grid-card">
                <h3>Streaming <span>ActivityType.Streaming</span></h3>
                <p>Displays as "Streaming [Title]" with a purple icon.</p>
            </div>
            <div className="grid-card">
                <h3>Listening <span>ActivityType.Listening</span></h3>
                <p>Displays as "Listening to [Audio]"</p>
            </div>
            <div className="grid-card">
                <h3>Watching <span>ActivityType.Watching</span></h3>
                <p>Displays as "Watching [Video/Movie]"</p>
            </div>
            <div className="grid-card">
                <h3>Competing <span>ActivityType.Competing</span></h3>
                <p>Displays as "Competing in [Tournament]"</p>
            </div>
            <div className="grid-card">
                <h3>Custom <span>ActivityType.Custom</span></h3>
                <p>Displays a custom status and emoji.</p>
            </div>
        </div>

        <h2 id="discord-vr">Discord VR Trick</h2>
        <p>
            You can trick Discord into displaying the rare <strong>Discord VR</strong> icon on your bot by overriding the WebSocket browser identity.
        </p>
        <p>
            When discord.js connects to the Discord gateway, it sends an <code>Identify</code> payload that includes properties about the operating system and browser. By default, the browser is set to "discord.js". If you change this value to "Discord VR", Discord's backend recognizes it as a VR client and applies the special VR headset icon to your bot's presence globally.
        </p>

        <div className="callout" style={{borderLeftColor: '#8b5cf6', background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
            <div className="callout-title" style={{color: '#8b5cf6'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                Why it works
            </div>
            <p>Discord has native integrations for VR platforms (like Oculus/Meta Quest). When a user logs in from the Discord VR app, their browser property is reported as "Discord VR". Bots can spoof this exact same property to get the cosmetic icon.</p>
        </div>

        <h3>Implementation Steps</h3>
        <p>You must apply this override <strong>before</strong> your bot attempts to log in. The best place is at the very top of your main entry file (e.g., <code>index.js</code>).</p>

        <pre><code><span className="token keyword">const</span> <span className="token punctuation">{'{'}</span>
  Client<span className="token punctuation">,</span>
  GatewayIntentBits<span className="token punctuation">,</span>
  ActivityType<span className="token punctuation">,</span>
  DefaultWebSocketManagerOptions<span className="token punctuation">,</span>
<span className="token punctuation">{'}'}</span> <span className="token operator">=</span> <span className="token keyword">require</span><span className="token punctuation">(</span><span className="token string">"discord.js"</span><span className="token punctuation">)</span><span className="token punctuation">;</span>

<span className="token comment">// 1. Override the browser property to trigger the VR icon</span>
DefaultWebSocketManagerOptions<span className="token punctuation">.</span>identifyProperties<span className="token punctuation">.</span>browser <span className="token operator">=</span> <span className="token string">"Discord VR"</span><span className="token punctuation">;</span>

<span className="token comment">// 2. Initialize your client normally</span>
<span className="token keyword">const</span> client <span className="token operator">=</span> <span className="token keyword">new</span> <span className="token class-name">Client</span><span className="token punctuation">(</span><span className="token punctuation">{'{'}</span>
  <span className="token property">intents</span><span className="token punctuation">:</span> <span className="token punctuation">[</span>GatewayIntentBits<span className="token punctuation">.</span>Guilds<span className="token punctuation">]</span><span className="token punctuation">,</span>
  <span className="token property">presence</span><span className="token punctuation">:</span> <span className="token punctuation">{'{'}</span>
    <span className="token property">status</span><span className="token punctuation">:</span> <span className="token string">'online'</span><span className="token punctuation">,</span>
    <span className="token property">activities</span><span className="token punctuation">:</span> <span className="token punctuation">[</span><span className="token punctuation">{'{'}</span>
      <span className="token property">name</span><span className="token punctuation">:</span> <span className="token string">'in Virtual Reality'</span><span className="token punctuation">,</span>
      <span className="token property">type</span><span className="token punctuation">:</span> ActivityType<span className="token punctuation">.</span>Playing
    <span className="token punctuation">{'}'}</span><span className="token punctuation">]</span>
  <span className="token punctuation">{'}'}</span>
<span className="token punctuation">{'}'}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>

<span className="token comment">// 3. Login</span>
client<span className="token punctuation">.</span><span className="token function">login</span><span className="token punctuation">(</span><span className="token string">"YOUR_BOT_TOKEN_HERE"</span><span className="token punctuation">)</span><span className="token punctuation">;</span></code></pre>

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
