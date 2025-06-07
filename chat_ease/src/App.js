import React, { useState, useCallback, useEffect, createContext } from 'react';
import './App.css';
import Navbar from './Navbar';
import LandingPage from './LandingPage';

// Import react-router dependencies and ChatPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage';

// Context to provide theme and toggle logic globally
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// PUBLIC_INTERFACE
function App() {
  /**
   * App component — global provider of theme context.
   * Only App manages theme state and persistence.
   * Navbar receives context to toggle, LandingPage gets theme as prop (no toggle, no state).
   */
  const getSystemTheme = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') || getSystemTheme();
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Ensure that theme is stored and applied immediately
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;