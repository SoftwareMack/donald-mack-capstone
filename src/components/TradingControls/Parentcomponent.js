// ParentComponent.js
import React, { useState, useEffect } from 'react';
import TradingControls from '../TradingControls/TradingControls';
const ParentComponent = () => {
  const [userWatchlist, setUserWatchlist] = useState([]);

  useEffect(() => {
    const fetchUserWatchlist = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/watchlist');
        if (!response.ok) {
          throw new Error(`Failed to fetch user watchlist data. Status: ${response.status}`);
        }
        const watchlistData = await response.json();
        setUserWatchlist(watchlistData);
      } catch (error) {
        console.error('Error fetching user watchlist data:', error);
      }
    };

    fetchUserWatchlist();
  }, []);

  const handleBackToDashboard = () => {
  };

  return (
    <div>
      {/* Other components or UI elements */}
      <TradingControls onBackToDashboard={handleBackToDashboard} userWatchlist={userWatchlist} />
      {/* Other components or UI elements */}
    </div>
  );
};

export default ParentComponent;
