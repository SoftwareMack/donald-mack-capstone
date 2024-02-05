// LoadingSpinner.js

import React from 'react';
import './LoadingSpinner.scss'; // Import your SCSS file for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner">
        <span>$</span>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
