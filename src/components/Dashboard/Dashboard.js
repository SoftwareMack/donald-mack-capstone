// Dashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDollarSign, faBell } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.scss'; // Import the corresponding SCSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to The Stock Wizards Dashboard!</h2>

      <div className="dashboard-icons">
        <Link to="/charts" className="dashboard-icon">
          <FontAwesomeIcon icon={faChartLine} size="3x" />
          <span>Stock Charts</span>
        </Link>

        <Link to="/portfolio" className="dashboard-icon">
          <FontAwesomeIcon icon={faDollarSign} size="3x" />
          <span>Portfolio</span>
        </Link>

        <Link to="/notifications" className="dashboard-icon">
          <FontAwesomeIcon icon={faBell} size="3x" />
          <span>Notifications</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
