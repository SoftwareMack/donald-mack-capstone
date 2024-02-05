// DashboardPage.js

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
          <button>
            <img className="dashboard__link" src="stock-chart-image.jpg" alt="Stock Chart" />
          </button>
        </Link>

        <Link to="/stock-list" className="dashboard__link">
          <button>
            <img className="dashboard__link" src="stock-list-image.jpg" alt="Stock List" />
          </button>
        </Link>

        <Link to="/signal-indicator" className="dashboard__link">
          <button>
            <img className="dashboard__link" src="signal-indicator-image.jpg" alt="Signal Indicator" />
          </button>
        </Link>

        <Link to="/trading-controls" className="dashboard__link">
          <button>
            <img className="dashboard__link" src="trading-controls-image.jpg" alt="Trading Controls" />
          </button>
        </Link>

        <Link to="/notifications" className="dashboard__link">
          <button>
            <img className="dashboard__link dashboard__link--blinking" src="'../../../src/assets/backgroundImages/4.jpg'" alt="Notifications" />
          </button>
        </Link>


        <Link to="/portfolio-summary" className="dashboard__link">
          <button>
            <img className="dashboard__link" src="portfolio-summary-image.jpg" alt="Portfolio Summary" />
          </button>
        </Link>

        <Link to="/paper-trading" className="dashboard__link">
          <button>
            <img className="dashboard__link" src="paper-trading-image.jpg" alt="Paper Trading" />
          </button>
        </Link>

        <Link to="/order-form" className="dashboard__link">
          <button>
            <span>Order Form</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
