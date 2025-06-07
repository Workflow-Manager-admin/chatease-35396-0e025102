import React, { useEffect, useState } from "react";
import "./LandingPage.css";

// PUBLIC_INTERFACE
function LandingPage() {
  /**
   * TalkBuddy Landing Page - fully responsive, light/dark mode, 
   * modern fonts, neon/glow accents, SVG/animated placeholders,
   * smooth fade/scroll-in animations, theme persistence, 
   * and accessibility.
   */

  // Theme handled globally but use state here for seamless toggle/fade
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  // For triggering animations on scroll
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.89) {
          el.classList.add("animated");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div className={`landing-root landing-root--${theme}`}>
      {/* HERO SECTION */}
      <header className="landing-hero" tabIndex="-1">
        <div className="hero__texts animate-on-scroll">
          <h1 className="hero__title font-pair">
            TalkBuddy <span className="emoji hero__sparkle" role="img" aria-label="Talk and sparkles">💬✨</span>
          </h1>
          <p className="hero__desc">
            The AI chat partner who’s always ready to listen, help, brainstorm, or just talk — no sign up, no hassle.
          </p>
          <div className="hero__cta-group">
            <a className="btn-glow hero__cta-btn" href="/chat" tabIndex="0">
              Start Chatting
            </a>
            <a className="hero__learn-btn" href="#features" tabIndex="0">
              Learn More
            </a>
            <button
              className={`theme-toggle__landing${theme === 'dark' ? ' is-dark':''}`}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              type="button"
              onClick={toggleTheme}
            >
              <span className="theme-toggle__icon">
                {theme === "dark" ? (
                  // Sun icon
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5.5" stroke="#FFD166" strokeWidth="2.2"/>
                    <g stroke="#FFD166" strokeWidth="1.6">
                      <line x1="12" y1="2.5" x2="12" y2="5"/>
                      <line x1="12" y1="19" x2="12" y2="21.5"/>
                      <line x1="4.09" y1="4.09" x2="5.9" y2="5.9"/>
                      <line x1="18.1" y1="18.1" x2="19.91" y2="19.91"/>
                      <line x1="2.5" y1="12" x2="5" y2="12"/>
                      <line x1="19" y1="12" x2="21.5" y2="12"/>
                      <line x1="4.09" y1="19.91" x2="5.9" y2="18.1"/>
                      <line x1="18.1" y1="5.9" x2="19.91" y2="4.09"/>
                    </g>
                  </svg>
                ) : (
                  // Moon icon
                  <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 12.85C20.31 13.1 19.57 13.23 18.8 13.23C15.13 13.23 12.14 10.24 12.14 6.57C12.14 5.8 12.27 5.06 12.52 4.37C8.67 5.1 5.7 8.36 5.7 12.35C5.7 16.49 9.01 19.8 13.15 19.8C17.14 19.8 20.4 16.83 21 12.85Z"
                      fill="#FFD166"
                      stroke="#FFD166"
                      strokeWidth="1.6"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
        <div className="hero__anim animate-on-scroll" aria-hidden="true">
          {/* SVG placeholder for animated bot/persona */}
          <svg className="hero-svg" viewBox="0 0 191 173" width="180" height="163">
            <defs>
              <radialGradient id="chat-gradient" cx="50%" cy="50%" r="65%" fx="55%" fy="50%">
                <stop offset="0%" stopColor={theme === "dark" ? "#2e3851" : "#eaf6ff"}/>
                <stop offset="80%" stopColor="#4F8CFF"/>
                <stop offset="100%" stopColor={theme === "dark" ? "#12266d" : "#0058db"}/>
              </radialGradient>
              <filter id="bubbleShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#4F8CFF99" />
              </filter>
            </defs>
            <ellipse
              cx="92" cy="87" rx="75" ry="74"
              fill="url(#chat-gradient)"
              filter="url(#bubbleShadow)"
            />
            <ellipse cx="135" cy="133" rx="22" ry="18" fill="#fff" opacity="0.30" />
            <ellipse cx="49" cy="39" rx="9" ry="8" fill="#FFD166" opacity="0.5" />
            <ellipse cx="145" cy="30" rx="11" ry="10" fill="#4F8CFF" opacity="0.16" />
            <ellipse cx="50" cy="120" rx="16" ry="14" fill="#FFD166" opacity="0.12" />
            <rect x="61" y="63" rx="13" width="62" height="31" fill="#fff" opacity="0.09" />
            <rect x="82" y="107" rx="7" width="30" height="17" fill="#22272E" opacity="0.16" />
            {/* Glowing bot eyes as neon if dark, blue-shadowed in light mode */}
            <ellipse cx="112" cy="93" rx="6" ry="3.2" fill="#00FFFF" opacity="0.92">
              <animate attributeName="opacity" values="0.93;0.7;0.93" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="77" cy="93" rx="6" ry="3.2" fill="#00FFFF" opacity="0.92">
              <animate attributeName="opacity" values="0.93;0.53;0.93" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="landing-features animate-on-scroll" id="features">
        <div className="features__title">Why TalkBuddy?</div>
        <div className="features__cards">
          {/* Feature Card 1 */}
          <div className="feature-card animate-on-scroll">
            <div className="feature-card__icon">
              <svg viewBox="0 0 40 40" width="38" height="38">
                <circle cx="20" cy="20" r="15" fill="#4F8CFF" fillOpacity="0.25"/>
                <path
                  d="M12.8 21 A7 7 0 1 0 27 13 M27 13 l-2.2 7.1a1 1 0 0 1-1.47.61L14.6 15.8"
                  stroke="#4F8CFF"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="27" cy="13" r="1.5" fill="#FFD166"/>
              </svg>
            </div>
            <div className="feature-card__title">Instant AI Answers</div>
            <div className="feature-card__desc">
              Quick, smart responses for any question—<b>no waiting, no login.</b>
            </div>
          </div>
          {/* Feature Card 2 */}
          <div className="feature-card animate-on-scroll">
            <div className="feature-card__icon">
              <svg width="38" height="38" viewBox="0 0 40 40">
                <rect x="6" y="9" rx="7" width="28" height="22" fill="#00ffff" fillOpacity=".18"/>
                <rect x="11" y="13" rx="4" width="18" height="12" fill="#fff" opacity=".15"/>
                <path d="M11 30C14.7 28.2 25.3 28.2 29 30" stroke="#4F8CFF" strokeWidth="1.5" opacity=".41"/>
                <ellipse cx="28.5" cy="16" rx="1.8" ry="1.6" fill="#FFD166"/>
                <ellipse cx="14.5" cy="16" rx="1.8" ry="1.6" fill="#FFD166"/>
              </svg>
            </div>
            <div className="feature-card__title">Conversational Practice</div>
            <div className="feature-card__desc">
              Sharpen language skills & rehearse interviews in a friendly, private zone.
            </div>
          </div>
          {/* Feature Card 3 */}
          <div className="feature-card animate-on-scroll">
            <div className="feature-card__icon">
              <svg width="38" height="38" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="#FFD166" fillOpacity=".11"/>
                <path
                  d="M15 23l-2.1 7.3c-.2.7.46 1.3 1.11 1.1l5.3-1.7M28.5 19.2A9 9 0 0 0 21 11.4M28.5 19.2l-6.1 4.2"
                  stroke="#FFD166"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="28.5" cy="19.2" r="1.5" fill="#4F8CFF"/>
              </svg>
            </div>
            <div className="feature-card__title">Brainstorming Power</div>
            <div className="feature-card__desc">
              Break creative blocks, plan, or get inspired with <b>AI-driven ideas.</b>
            </div>
          </div>
          {/* Feature Card 4 */}
          <div className="feature-card animate-on-scroll">
            <div className="feature-card__icon">
              <svg width="38" height="38" viewBox="0 0 40 40">
                <rect x="7" y="8" rx="8" width="26" height="24" fill="#4F8CFF" fillOpacity=".13"/>
                <path d="M8 22h8v8H8zM24 12h8v8h-8z" fill="#4F8CFF" opacity=".22"/>
                <rect x="15" y="18" rx="3" width="10" height="4" fill="#FFD166" fillOpacity=".66"/>
              </svg>
            </div>
            <div className="feature-card__title">Light & Dark Mode</div>
            <div className="feature-card__desc">
              Comfortable on any screen—seamless switching and theme <b>persistence</b>.
            </div>
          </div>
        </div>
      </section>

      {/* CHAT PREVIEW SECTION */}
      <section className="landing-preview animate-on-scroll">
        <div className="preview__title">See TalkBuddy in Action</div>
        <div className="preview__chat-ui">
          <div className="bubble bubble--user bubble-anim">
            Hi there! 👋 Can you help brainstorm birthday ideas?
          </div>
          <div className="bubble bubble--ai bubble-anim-delayed">
            Absolutely! 🎉 Want ideas for a party, a gift, or something unique?
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="landing-final-cta animate-on-scroll">
        <div className="final-cta__inner">
          <div className="final-cta__title">Ready to chat smarter?</div>
          <a className="final-cta-btn btn-glow" href="/chat">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
