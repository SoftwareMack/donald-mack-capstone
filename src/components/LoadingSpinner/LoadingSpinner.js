// LoadingSpinner.js

import React, { useState, useEffect } from 'react';
import './LoadingSpinner.scss'; // Import the corresponding SCSS file

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      try {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="loading-spinner-container">
      {loading ? (
        <div className="dollar-sign-spinner">$</div>
      ) : error ? (
        <div className="error-message">Error loading data. Please try again.</div>
      ) : (
        <div className="content">Loaded content goes here</div>
      )}
    </div>
  );
};

export default LoadingSpinner;
