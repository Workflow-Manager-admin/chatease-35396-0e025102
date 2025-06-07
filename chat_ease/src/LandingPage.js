import React from "react";
import "./LandingPage.css";

// PUBLIC_INTERFACE
function LandingPage() {
  // Uses SVGs as lightweight animated/illustrative placeholders

  return (
    <div className="landing-root">
      {/* HERO SECTION */}
      <header className="landing-hero">
        <div className="hero-texts">
          <h1 className="hero-title">
            TalkBuddy <span role="img" aria-label="sparkles" className="emoji">💬✨</span>
          </h1>
          <p className="hero-desc">
            The AI chat partner who’s always ready to listen and help — brainstorm, practice, get instant answers, or just chat, no login needed.
          </p>
          <div className="hero-cta-group">
            <a className="hero-cta-btn btn-glow" href="/chat">
              Start Chatting
            </a>
            <a className="hero-learn-btn" href="#features">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-anim">
          {/* SVG animation placeholder */}
          <svg className="hero-svg" viewBox="0 0 191 173" width="180" height="163" aria-hidden="true">
            <defs>
              <radialGradient id="chat-gradient" cx="50%" cy="50%" r="65%" fx="55%" fy="50%">
                <stop offset="0%" stopColor="#EAF6FF" />
                <stop offset="80%" stopColor="#4F8CFF" />
                <stop offset="100%" stopColor="#0058db" />
              </radialGradient>
              <filter id="bubbleShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#4F8CFF99" />
              </filter>
            </defs>
            <ellipse cx="92" cy="87" rx="75" ry="74" fill="url(#chat-gradient)" filter="url(#bubbleShadow)" />
            <ellipse cx="135" cy="133" rx="22" ry="18" fill="#fff" opacity="0.30" />
            <ellipse cx="49" cy="39" rx="9" ry="8" fill="#FFD166" opacity="0.5" />
            <ellipse cx="145" cy="30" rx="11" ry="10" fill="#4F8CFF" opacity="0.16" />
            <ellipse cx="50" cy="120" rx="16" ry="14" fill="#FFD166" opacity="0.12" />
            <rect x="61" y="63" rx="13" width="62" height="31" fill="#fff" opacity="0.09" />
            <rect x="82" y="107" rx="7" width="30" height="17" fill="#22272E" opacity="0.16" />
          </svg>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="landing-features" id="features">
        <div className="features-title">Why TalkBuddy?</div>
        <div className="features-cards">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 40 40" width="38" height="38"><circle cx="20" cy="20" r="15" fill="#4F8CFF" fillOpacity="0.28"/><path d="M12.8 21 A7 7 0 1 0 27 13 M27 13 l-2.2 7.1a1 1 0 0 1-1.47.61L14.6 15.8" stroke="#4F8CFF" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="27" cy="13" r="1.5" fill="#FFD166"/></svg>
            </div>
            <div className="feature-title">Instant AI Answers</div>
            <div className="feature-desc">Get quick, smart responses for any question, anytime—no waiting, no login.</div>
          </div>
          {/* Card 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="38" height="38" viewBox="0 0 40 40"><rect x="6" y="9" rx="7" width="28" height="22" fill="#00ffff" fillOpacity=".21"/><rect x="11" y="13" rx="4" width="18" height="12" fill="#fff" opacity=".18"/><path d="M11 30C14.7 28.2 25.3 28.2 29 30" stroke="#4F8CFF" strokeWidth="1.6" opacity=".45"/><ellipse cx="28.5" cy="16" rx="1.8" ry="1.6" fill="#FFD166"/><ellipse cx="14.5" cy="16" rx="1.8" ry="1.6" fill="#FFD166"/></svg>
            </div>
            <div className="feature-title">Conversational Practice</div>
            <div className="feature-desc">Sharpen language skills or rehearse interviews in a judgment-free AI chat zone.</div>
          </div>
          {/* Card 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="38" height="38" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#FFD166" fillOpacity=".11"/><path d="M15 23l-2.1 7.3c-.2.7.46 1.3 1.11 1.1l5.3-1.7M28.5 19.2A9 9 0 0 0 21 11.4M28.5 19.2l-6.1 4.2" stroke="#FFD166" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="28.5" cy="19.2" r="1.5" fill="#4F8CFF"/></svg>
            </div>
            <div className="feature-title">Brainstorming Power</div>
            <div className="feature-desc">Break creative blocks, plan, or get inspired with AI-driven idea generation.</div>
          </div>
          {/* Card 4 */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="38" height="38" viewBox="0 0 40 40"><rect x="7" y="8" rx="8" width="26" height="24" fill="#4F8CFF" fillOpacity=".12"/><path d="M8 22h8v8H8zM24 12h8v8h-8z" fill="#4F8CFF" opacity=".25"/><rect x="15" y="18" rx="3" width="10" height="4" fill="#FFD166" fillOpacity=".71"/></svg>
            </div>
            <div className="feature-title">Light & Dark Mode</div>
            <div className="feature-desc">Switch up the vibe—comfortable viewing any time, with seamless theme toggle.</div>
          </div>
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section className="landing-preview">
        <div className="preview-title">See TalkBuddy in Action</div>
        <div className="preview-chat-ui">
          <div className="bubble bubble-user bubble-anim">
            Hi there! 👋 Can you help brainstorm birthday ideas?
          </div>
          <div className="bubble bubble-ai bubble-anim-delayed">
            Absolutely! 🎉 Want ideas for a party, a gift, or something unique?
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="landing-final-cta">
        <div className="final-cta-inner">
          <div className="final-cta-title">Ready to chat smarter?</div>
          <a className="final-cta-btn btn-glow" href="/chat">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
