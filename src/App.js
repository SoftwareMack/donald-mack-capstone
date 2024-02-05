// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile';
import StockCharts from './components/StockCharts/StockCharts';
import BuySellSignal from './components/BuySellSignal/BuySellSignal';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorHandling from './components/ErrorHandling/ErrorHandling';
//import Login from './components/Login/Login'; // Import the Login component
//import Signup from './components/Signup/Signup'; // Import the Signup component

const App = () => {
  // Simulate an error for demonstration purposes
  const hasError = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/stock-charts" element={<StockCharts />} />
        <Route path="/buy-sell-signal" element={<BuySellSignal />} />
        <Route path="/loading-spinner" element={<LoadingSpinner />} />

        <Route
          path="/error"
          element={<ErrorHandling errorMessage="An error occurred. Please try again later." />}
        />
        <Route path="/" element={<Footer />} />
      </Routes>
    </Router>
  );
};

export default App;
