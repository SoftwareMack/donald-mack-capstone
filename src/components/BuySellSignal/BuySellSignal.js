// BuySellSignal.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuySellSignal.scss'; // Import the corresponding SCSS file

const BuySellSignal = () => {
  const [stockData, setStockData] = useState({
    symbol: '',
    price: 0,
    signal: '',
  });

  useEffect(() => {
    // Fetch real-time stock data for Buy/Sell Signal from an external API
    const fetchData = async () => {
      try {
        const response = await axios.get('YOUR_BUY_SELL_API_ENDPOINT');
        // Parse and format the data as needed
        const formattedData = response.data;
        setStockData({
          symbol: formattedData.symbol,
          price: formattedData.price,
          signal: formattedData.signal,
        });
      } catch (error) {
        console.error('Error fetching Buy/Sell Signal data:', error);
      }
    };

    // Fetch data on component mount
    fetchData();

    // Set up interval to fetch data periodically
    const interval = setInterval(fetchData, 60000); // Update every minute

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="buy-sell-signal-container">
      <div className={`signal ${stockData.signal.toLowerCase()}`}>
        {stockData.signal}
      </div>
      <div className="stock-info">
        <p className="symbol">{stockData.symbol}</p>
        <p className="price">${stockData.price}</p>
      </div>
    </div>
  );
};

export default BuySellSignal;
