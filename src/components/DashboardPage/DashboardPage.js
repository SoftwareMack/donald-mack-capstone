import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.scss';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>The Stock Wizard</h1>
      </header>

      <div className="dashboard__links">
        <Link to="/stock-chart" className="dashboard__link">
          <button>Stock Chart</button>
        </Link>

        <Link to="/stock-list" className="dashboard__link">
          <button>Stock List</button>
        </Link>

        <Link to="/signal-indicator" className="dashboard__link">
          <button>Signal Indicator</button>
        </Link>

        <Link to="/trading-controls" className="dashboard__link">
          <button>Trading Controls</button>
        </Link>

        <Link to="/notifications" className="dashboard__link">
          <button>Notifications</button>
        </Link>
      </div>
      <footer className="dashboard__footer">
  <p>Copyright 2024 | Created by Donald Mack</p>
  <a href="https://www.linkedin.com/in/softwaremack/" target="_blank" rel="noopener noreferrer" className="footer__social footer__social--linkedin"></a>
  <a href="https://github.com/SoftwareMack" target="_blank" rel="noopener noreferrer" className="footer__social footer__social--github"></a>
</footer>
    </div>
  );
};

export default DashboardPage;
