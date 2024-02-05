// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'; // Import the corresponding SCSS file

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">The Stock Wizards</h1>
      <nav className="nav-links">
        <Link to="/user-profile" className="nav-link">
          User Profile
        </Link>
        <Link to="/stock-charts" className="nav-link">
          Stock Charts
        </Link>
        <Link to="/buy-sell-signal" className="nav-link">
          Buy/Sell Signal
        </Link>
        <Link to="/loading-spinner" className="nav-link">
          Loading Spinner
        </Link>
      </nav>
    </header>
  );
};

export default Header;
