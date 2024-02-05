// ErrorHandling.js

import React from 'react';
import './ErrorHandling.scss'; // Import the corresponding SCSS file

const ErrorHandling = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default ErrorHandling;
