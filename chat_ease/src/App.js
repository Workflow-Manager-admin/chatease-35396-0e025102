import React from 'react';
import './App.css';
import Navbar from './Navbar';
import LandingPage from './LandingPage';

// PUBLIC_INTERFACE
function App() {
  /**
   * App component — renders Navbar and handles home ("/") view logic.
   * In a minimal, no-router setup, always renders LandingPage below Navbar.
   * If react-router integration is added, handle routes accordingly.
   */
  return (
    <div className="app">
      <Navbar />
      {/* Home route always renders LandingPage */}
      <LandingPage />
    </div>
  );
}

export default App;