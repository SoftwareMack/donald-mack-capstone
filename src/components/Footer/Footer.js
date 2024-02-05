// Footer.js

import React from 'react';
import './Footer.scss'; // Import the corresponding SCSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <p>
        &copy; {new Date().getFullYear()} SoftwareMack. Developed by Donald Mack.
      </p>
    </div>
  );
};

export default Footer;
