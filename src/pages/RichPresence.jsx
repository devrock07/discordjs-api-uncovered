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

        <h2 id="user-accounts">User Accounts vs. Bot Accounts</h2>
        <p>
            You might be wondering if you can use these custom presences and the Discord VR trick on your personal user account. Here is what you need to know:
        </p>

        <div className="grid-layout" style={{marginTop: '24px'}}>
            <div className="grid-card" style={{borderLeft: '4px solid #ef4444', padding: '24px'}}>
                <h3 style={{fontSize: '1.1rem', marginTop: 0}}>The Danger of Self-Botting</h3>
                <p style={{fontSize: '0.9rem', marginBottom: 0}}>
                    Do <strong>not</strong> attempt to log into your personal user account using a discord.js client token. This is known as "self-botting" and is strictly against Discord's Terms of Service. It can result in a permanent account ban.
                </p>
            </div>
            <div className="grid-card" style={{borderLeft: '4px solid #10b981', padding: '24px'}}>
                <h3 style={{fontSize: '1.1rem', marginTop: 0}}>The Safe Way: Local IPC</h3>
                <p style={{fontSize: '0.9rem', marginBottom: 0}}>
                    To safely show a custom status or "Playing" status on your user account, you must use a local IPC connection (like the <code>discord-rpc</code> npm package). This connects to your running Discord desktop app, which then safely broadcasts the status for you.
                </p>
            </div>
        </div>

        <div className="callout" style={{marginTop: '24px'}}>
            <div className="callout-title">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                Getting the VR icon on a user account
            </div>
            <p>Because the local IPC method relies on your desktop app, you cannot easily spoof the "Discord VR" browser property through a script. To get the VR icon on a user account, you must either log in from an actual VR headset or use third-party client modifications (like Vencord plugins) to spoof the client properties your Discord app sends.</p>
        </div>

        <h3 id="vencord-vr-method" style={{marginTop: '48px'}}>The Vencord Console Method</h3>
        <p>
            If you use <strong>Vencord</strong> or <strong>Vesktop</strong>, you can manually spoof the VR status by intercepting the Discord WebSocket connection via the Developer Tools. This requires no extra plugins.
        </p>
        
        <ol className="spec-list" style={{listStylePosition: 'inside', paddingLeft: 0, marginTop: '16px', marginBottom: '24px'}}>
            <li style={{marginBottom: '12px'}}>Open Vencord and press <code>Ctrl + Shift + I</code> (or <code>Cmd + Option + I</code> on Mac) to open the Developer Tools.</li>
            <li style={{marginBottom: '12px'}}>Navigate to the <strong>Console</strong> tab.</li>
            <li style={{marginBottom: '12px'}}>Paste the following script into the console and hit Enter. This script patches the WebSocket to change your browser identity right before Discord connects.</li>
        </ol>

        <pre><code><span className="token keyword">const</span> originalSend <span className="token operator">=</span> window<span className="token punctuation">.</span>WebSocket<span className="token punctuation">.</span>prototype<span className="token punctuation">.</span>send<span className="token punctuation">;</span>
window<span className="token punctuation">.</span>WebSocket<span className="token punctuation">.</span>prototype<span className="token punctuation">.</span><span className="token function-variable function">send</span> <span className="token operator">=</span> <span className="token keyword">function</span><span className="token punctuation">(</span>data<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
    <span className="token keyword">if</span> <span className="token punctuation">(</span><span className="token keyword">typeof</span> data <span className="token operator">===</span> <span className="token string">'string'</span> <span className="token operator">&&</span> data<span className="token punctuation">.</span><span className="token function">includes</span><span className="token punctuation">(</span><span className="token string">'"op":2'</span><span className="token punctuation">)</span><span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
        <span className="token keyword">try</span> <span className="token punctuation">{'{'}</span>
            <span className="token keyword">let</span> payload <span className="token operator">=</span> JSON<span className="token punctuation">.</span><span className="token function">parse</span><span className="token punctuation">(</span>data<span className="token punctuation">)</span><span className="token punctuation">;</span>
            <span className="token keyword">if</span> <span className="token punctuation">(</span>payload<span className="token punctuation">.</span>d <span className="token operator">&&</span> payload<span className="token punctuation">.</span>d<span className="token punctuation">.</span>properties<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
                <span className="token comment">// Force the browser property to Discord VR</span>
                payload<span className="token punctuation">.</span>d<span className="token punctuation">.</span>properties<span className="token punctuation">.</span>browser <span className="token operator">=</span> <span className="token string">"Discord VR"</span><span className="token punctuation">;</span>
                payload<span className="token punctuation">.</span>d<span className="token punctuation">.</span>properties<span className="token punctuation">.</span>device <span className="token operator">=</span> <span className="token string">"Discord VR"</span><span className="token punctuation">;</span>
                payload<span className="token punctuation">.</span>d<span className="token punctuation">.</span>properties<span className="token punctuation">.</span>os <span className="token operator">=</span> <span className="token string">"Discord VR"</span><span className="token punctuation">;</span>
                
                data <span className="token operator">=</span> JSON<span className="token punctuation">.</span><span className="token function">stringify</span><span className="token punctuation">(</span>payload<span className="token punctuation">)</span><span className="token punctuation">;</span>
                console<span className="token punctuation">.</span><span className="token function">log</span><span className="token punctuation">(</span><span className="token string">"%c[VR Spoofer]%c Intercepted and changed identity to VR!"</span><span className="token punctuation">,</span> <span className="token string">"color: #10b981; font-weight: bold;"</span><span className="token punctuation">,</span> <span className="token string">""</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
            <span className="token punctuation">{'}'}</span>
        <span className="token punctuation">{'}'}</span> <span className="token keyword">catch</span> <span className="token punctuation">(</span>e<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span><span className="token punctuation">{'}'}</span>
    <span className="token punctuation">{'}'}</span>
    <span className="token keyword">return</span> originalSend<span className="token punctuation">.</span><span className="token function">call</span><span className="token punctuation">(</span><span className="token keyword">this</span><span className="token punctuation">,</span> data<span className="token punctuation">)</span><span className="token punctuation">;</span>
<span className="token punctuation">{'}'}</span><span className="token punctuation">;</span></code></pre>
        
        <div className="callout" style={{marginTop: '24px'}}>
            <div className="callout-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Triggering the Reconnect
            </div>
            <p>Discord only sends your "browser" property exactly once when it connects. Because your Discord is already running when you paste this, the script will wait. To trigger it immediately without refreshing (which clears the console), briefly turn off your PC's Wi-Fi/Internet, run the script, and turn your Wi-Fi back on. Once Discord reconnects, your profile will instantly update with the VR headset icon!</p>
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
