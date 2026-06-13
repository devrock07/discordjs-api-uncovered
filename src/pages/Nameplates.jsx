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

        <h2 id="color-conversion">Color Conversion Helper</h2>
        <p>
            Because Discord's API requires decimal integers for colors instead of hex strings, you will need to convert your standard hex colors before sending the payload. Here is a quick utility function to do that in JavaScript:
        </p>
        <pre><code><span className="token keyword">function</span> <span className="token function">hexToDecimal</span><span className="token punctuation">(</span>hex<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
    <span className="token comment">// Remove the hash if it exists</span>
    hex <span className="token operator">=</span> hex<span className="token punctuation">.</span><span className="token function">replace</span><span className="token punctuation">(</span><span className="token string">'#'</span><span className="token punctuation">,</span> <span className="token string">''</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
    <span className="token keyword">return</span> <span className="token function">parseInt</span><span className="token punctuation">(</span>hex<span className="token punctuation">,</span> <span className="token number">16</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
<span className="token punctuation">{'}'}</span>

<span className="token comment">// Usage:</span>
<span className="token keyword">const</span> decimalColor <span className="token operator">=</span> <span className="token function">hexToDecimal</span><span className="token punctuation">(</span><span className="token string">'#FF69B4'</span><span className="token punctuation">)</span><span className="token punctuation">;</span> <span className="token comment">// 16738740</span></code></pre>

        <h2 id="code-examples">discord.js Implementation Example</h2>
        <p>
            Here is a fully working example of how to implement this as a slash command using <code>discord.js</code> v14. This example applies the "Sakura" font with a "Glow" effect, colored pink.
        </p>
        <pre><code><span className="token keyword">const</span> <span className="token punctuation">{'{'}</span> SlashCommandBuilder<span className="token punctuation">,</span> Routes <span className="token punctuation">{'}'}</span> <span className="token operator">=</span> <span className="token keyword">require</span><span className="token punctuation">(</span><span className="token string">'discord.js'</span><span className="token punctuation">)</span><span className="token punctuation">;</span>

<span className="token keyword">module</span><span className="token punctuation">.</span><span className="token property">exports</span> <span className="token operator">=</span> <span className="token punctuation">{'{'}</span>
    <span className="token property">data</span><span className="token punctuation">:</span> <span className="token keyword">new</span> <span className="token class-name">SlashCommandBuilder</span><span className="token punctuation">(</span><span className="token punctuation">)</span>
        <span className="token punctuation">.</span><span className="token function">setName</span><span className="token punctuation">(</span><span className="token string">'namestyle'</span><span className="token punctuation">)</span>
        <span className="token punctuation">.</span><span className="token function">setDescription</span><span className="token punctuation">(</span><span className="token string">'Updates the bot\\'s nameplate in this server.'</span><span className="token punctuation">)</span><span className="token punctuation">,</span>
        
    <span className="token keyword">async</span> <span className="token function">execute</span><span className="token punctuation">(</span>interaction<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
        <span className="token keyword">await</span> interaction<span className="token punctuation">.</span><span className="token function">deferReply</span><span className="token punctuation">(</span><span className="token punctuation">{'{'}</span> <span className="token property">ephemeral</span><span className="token punctuation">:</span> <span className="token keyword">true</span> <span className="token punctuation">{'}'}</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
        
        <span className="token keyword">try</span> <span className="token punctuation">{'{'}</span>
            <span className="token keyword">await</span> interaction<span className="token punctuation">.</span>client<span className="token punctuation">.</span>rest<span className="token punctuation">.</span><span className="token function">patch</span><span className="token punctuation">(</span>
                Routes<span className="token punctuation">.</span><span className="token function">guildMember</span><span className="token punctuation">(</span>interaction<span className="token punctuation">.</span>guildId<span className="token punctuation">,</span> <span className="token string">"@me"</span><span className="token punctuation">)</span><span className="token punctuation">,</span> 
                <span className="token punctuation">{'{'}</span>
                    <span className="token property">body</span><span className="token punctuation">:</span> <span className="token punctuation">{'{'}</span>
                        <span className="token property">display_name_font_id</span><span className="token punctuation">:</span> <span className="token number">3</span><span className="token punctuation">,</span>       <span className="token comment">// Sakura font</span>
                        <span className="token property">display_name_effect_id</span><span className="token punctuation">:</span> <span className="token number">6</span><span className="token punctuation">,</span>     <span className="token comment">// Glow effect</span>
                        <span className="token property">display_name_colors</span><span className="token punctuation">:</span> <span className="token punctuation">[</span><span className="token number">16738740</span><span className="token punctuation">]</span>  <span className="token comment">// Decimal for #FF69B4</span>
                    <span className="token punctuation">{'}'}</span>
                <span className="token punctuation">{'}'}</span>
            <span className="token punctuation">)</span><span className="token punctuation">;</span>
            <span className="token keyword">await</span> interaction<span className="token punctuation">.</span><span className="token function">editReply</span><span className="token punctuation">(</span><span className="token string">'Nameplate updated successfully!'</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
        <span className="token punctuation">{'}'}</span> <span className="token keyword">catch</span> <span className="token punctuation">(</span>error<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
            console<span className="token punctuation">.</span><span className="token function">error</span><span className="token punctuation">(</span>error<span className="token punctuation">)</span><span className="token punctuation">;</span>
            <span className="token keyword">await</span> interaction<span className="token punctuation">.</span><span className="token function">editReply</span><span className="token punctuation">(</span><span className="token string">'Failed to update nameplate.'</span><span className="token punctuation">)</span><span className="token punctuation">;</span>
        <span className="token punctuation">{'}'}</span>
    <span className="token punctuation">{'}'}</span>
<span className="token punctuation">{'}'}</span><span className="token punctuation">;</span></code></pre>

        <h2 id="clearing-nameplates">Removing a Nameplate</h2>
        <p>
            If you want to reset the bot's display name to the default style, simply pass <code>0</code> to the fields in the same API request to clear them.
        </p>
        <pre><code><span className="token property">body</span><span className="token punctuation">:</span> <span className="token punctuation">{'{'}</span>
    <span className="token property">display_name_font_id</span><span className="token punctuation">:</span> <span className="token number">0</span><span className="token punctuation">,</span>
    <span className="token property">display_name_effect_id</span><span className="token punctuation">:</span> <span className="token number">0</span><span className="token punctuation">,</span>
    <span className="token property">display_name_colors</span><span className="token punctuation">:</span> <span className="token punctuation">[</span><span className="token punctuation">]</span>
<span className="token punctuation">{'}'}</span></code></pre>

        <h2 id="why-others-fail">Why Other Cosmetics Fail</h2>
        <p>
            While Nameplates are open to bot customization, <strong>Avatar Decorations</strong> (e.g. <code>avatar_decoration_sku_id</code>) and <strong>Profile Effects</strong> (e.g. <code>profile_effect_id</code>) fail when sent from a bot account.
        </p>
        <p>
            Avatar decorations are catalog items managed by Discord's Shop. The API runs a backend inventory check on the calling account; if the account does not "own" the item's digital entitlement (which is impossible for bot accounts to claim or buy), the API rejects the update with a <code>COLLECTIBLES_NOT_OWNED</code> error. Similarly, profile effects are strictly restricted to the user settings endpoint (<code>/users/@me/profile</code>), which outright blocks bot accounts from connecting.
        </p>

        <h2 id="troubleshooting">Troubleshooting & Common Errors</h2>
        <p>
            When experimenting with these endpoints, you might run into a few common Discord API errors. Here is how to resolve them:
        </p>
        
        <div className="grid-layout" style={{marginTop: '24px'}}>
            <div className="grid-card" style={{borderLeft: '4px solid #ef4444', padding: '24px'}}>
                <h3 style={{fontSize: '1.1rem', marginTop: 0}}>400 Bad Request</h3>
                <p style={{fontSize: '0.9rem', marginBottom: 0}}>
                    Usually occurs if you provide an invalid <code>display_name_font_id</code> or <code>display_name_effect_id</code>. Refer to the Supported Options list above to ensure your IDs are correct.
                </p>
            </div>
            <div className="grid-card" style={{borderLeft: '4px solid #f59e0b', padding: '24px'}}>
                <h3 style={{fontSize: '1.1rem', marginTop: 0}}>403 Forbidden</h3>
                <p style={{fontSize: '0.9rem', marginBottom: 0}}>
                    Your bot lacks the <code>MANAGE_NICKNAMES</code> permission or is trying to update a profile in a server where it doesn't have sufficient hierarchy.
                </p>
            </div>
            <div className="grid-card" style={{borderLeft: '4px solid #8b5cf6', padding: '24px'}}>
                <h3 style={{fontSize: '1.1rem', marginTop: 0}}>COLLECTIBLES_NOT_OWNED</h3>
                <p style={{fontSize: '0.9rem', marginBottom: 0}}>
                    This happens if you attempt to send Avatar Decoration or Profile Effect IDs. Bots cannot own these entitlements. Stick strictly to Nameplate fields.
                </p>
            </div>
        </div>
        
        <h2 id="auto-apply-nameplates">Auto-Apply on Guild Join</h2>
        <p>
            You can automatically apply a nameplate to your bot the moment it joins a new server by listening to the <code>guildCreate</code> event:
        </p>
        <pre><code><span className="token keyword">module</span><span className="token punctuation">.</span><span className="token property">exports</span> <span className="token operator">=</span> <span className="token punctuation">{'{'}</span>
  <span className="token property">name</span><span className="token punctuation">:</span> <span className="token string">"guildCreate"</span><span className="token punctuation">,</span>
  <span className="token property">once</span><span className="token punctuation">:</span> <span className="token keyword">false</span><span className="token punctuation">,</span>
  <span className="token keyword">async</span> <span className="token function">execute</span><span className="token punctuation">(</span>guild<span className="token punctuation">,</span> client<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
    <span className="token keyword">try</span> <span className="token punctuation">{'{'}</span>
      <span className="token keyword">const</span> response <span className="token operator">=</span> <span className="token keyword">await</span> <span className="token function">fetch</span><span className="token punctuation">(</span>
        <span className="token template-string"><span className="token template-punctuation string">`</span><span className="token string">https://discord.com/api/v10/guilds/$</span><span className="token interpolation"><span className="token interpolation-punctuation punctuation">{'{'}</span>guild<span className="token punctuation">.</span>id<span className="token interpolation-punctuation punctuation">{'}'}</span></span><span className="token string">/members/@me</span><span className="token template-punctuation string">`</span></span><span className="token punctuation">,</span>
        <span className="token punctuation">{'{'}</span>
          <span className="token property">method</span><span className="token punctuation">:</span> <span className="token string">"PATCH"</span><span className="token punctuation">,</span>
          <span className="token property">headers</span><span className="token punctuation">:</span> <span className="token punctuation">{'{'}</span>
            <span className="token property">Authorization</span><span className="token punctuation">:</span> <span className="token template-string"><span className="token template-punctuation string">`</span><span className="token string">Bot $</span><span className="token interpolation"><span className="token interpolation-punctuation punctuation">{'{'}</span>client<span className="token punctuation">.</span>token<span className="token interpolation-punctuation punctuation">{'}'}</span></span><span className="token template-punctuation string">`</span></span><span className="token punctuation">,</span>
            <span className="token string-property property">"Content-Type"</span><span className="token punctuation">:</span> <span className="token string">"application/json"</span><span className="token punctuation">,</span>
            <span className="token string-property property">"User-Agent"</span><span className="token punctuation">:</span> <span className="token string">"DiscordBot (https://your-bot.com, 1.0.0)"</span><span className="token punctuation">,</span>
          <span className="token punctuation">{'}'}</span><span className="token punctuation">,</span>
          <span className="token property">body</span><span className="token punctuation">:</span> JSON<span className="token punctuation">.</span><span className="token function">stringify</span><span className="token punctuation">(</span><span className="token punctuation">{'{'}</span>
            <span className="token property">display_name_font_id</span><span className="token punctuation">:</span> <span className="token number">7</span><span className="token punctuation">,</span>
            <span className="token property">display_name_effect_id</span><span className="token punctuation">:</span> <span className="token number">4</span><span className="token punctuation">,</span>
            <span className="token property">display_name_colors</span><span className="token punctuation">:</span> <span className="token punctuation">[</span><span className="token number">16711680</span><span className="token punctuation">]</span><span className="token punctuation">,</span>
          <span className="token punctuation">{'}'}</span><span className="token punctuation">)</span><span className="token punctuation">,</span>
        <span className="token punctuation">{'}'}</span>
      <span className="token punctuation">)</span><span className="token punctuation">;</span>
    <span className="token punctuation">{'}'}</span> <span className="token keyword">catch</span> <span className="token punctuation">(</span>error<span className="token punctuation">)</span> <span className="token punctuation">{'{'}</span>
      console<span className="token punctuation">.</span><span className="token function">error</span><span className="token punctuation">(</span><span className="token string">"[x] Error in guildCreate event:"</span><span className="token punctuation">,</span> error<span className="token punctuation">)</span><span className="token punctuation">;</span>
    <span className="token punctuation">{'}'}</span>
  <span className="token punctuation">{'}'}</span><span className="token punctuation">,</span>
<span className="token punctuation">{'}'}</span><span className="token punctuation">;</span></code></pre>

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
