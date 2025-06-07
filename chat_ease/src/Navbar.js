import React, { useEffect, useState } from 'react';
import './Navbar.css';

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navbar component for TalkBuddy.
   * Modern layout: no logo dot/icon, "TalkBuddy" is a home link, only "Chat" and "About" on the right with theme toggle.
   */
  const [theme, setTheme] = useState(() => {
    // Check local storage for persisted theme, fallback to system theme
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    // Set document body class for theme and persist
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Only "Chat" and "About" links, right-aligned
  const navLinks = [
    { text: 'Chat', href: '#' },
    { text: 'About', href: '#' }
  ];

  return (
    <nav className={`navbar talkbuddy-navbar${theme === 'dark' ? ' dark' : ''}`}>
      <div className="navbar-inner">
        {/* No left links. Only logo as link to home */}
        <a href="/" className="navbar-logo home-link" style={{ textDecoration: 'none' }}>
          <span className="navbar-logo-text">TalkBuddy</span>
        </a>
        <div className="navbar-right">
          <div className="navbar-links right-links">
            {navLinks.map(link => (
              <a key={link.text} href={link.href} className="navbar-link">
                {link.text}
              </a>
            ))}
          </div>
          <button
            className={`theme-toggle${theme === 'dark' ? ' is-dark' : ''}`}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
          >
            <span className="theme-toggle-icon">
              {/* Smooth transition between sun/moon icons */}
              {theme === 'dark' ? (
                // Sun icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5.5" stroke="#FFD166" strokeWidth="2.2" />
                  <g stroke="#FFD166" strokeWidth="1.7">
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 12.85C20.31 13.1 19.57 13.23 18.8 13.23C15.13 13.23 12.14 10.24 12.14 6.57C12.14 5.8 12.27 5.06 12.52 4.37C8.67 5.1 5.7 8.36 5.7 12.35C5.7 16.49 9.01 19.8 13.15 19.8C17.14 19.8 20.4 16.83 21 12.85Z"
                    fill="#FFD166"
                    stroke="#FFD166"
                    strokeWidth="1.7"
                  />
                </svg>
              )}
            </span>
            <span className="theme-toggle-slider"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
