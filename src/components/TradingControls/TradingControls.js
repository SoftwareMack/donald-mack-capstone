import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TradingControls.scss';

const TradingControls = ({ onBackToDashboard }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [strategyParameters, setStrategyParameters] = useState({
    shortEmaPeriod: 9,
    longEmaPeriod: 21,
    volumeThreshold: 1000000,
  });

  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [generatedSignals, setGeneratedSignals] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const handleParameterChange = (parameter, value) => {
    setStrategyParameters((prevParameters) => ({
      ...prevParameters,
      [parameter]: value,
    }));
  };

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/watchlist');
        if (!response.ok) {
          throw new Error(`Failed to fetch watchlist data. Status: ${response.status}`);
        }
        const watchlistData = await response.json();
        setWatchlist(watchlistData);
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
      }
    };

    fetchWatchlistData();
  }, []);

  const fetchHistoricalData = async () => {
    if (selectedStock) {
      try {

        const apiKey = '3BLPG03TNFMQYCQ2';
        const symbol = selectedStock;

        const priceResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
        const priceData = await priceResponse.json();

        const historicalPrices = Object.values(priceData['Time Series (Daily)']).map((entry) => parseFloat(entry['4. close']));

        const volumeResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
        const volumeData = await volumeResponse.json();

        const historicalVolumes = Object.values(volumeData['Time Series (Daily)']).map((entry) => parseFloat(entry['5. volume']));

        setPriceData(historicalPrices);
        setVolumeData(historicalVolumes);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    }
  };

  useEffect(() => {
    fetchHistoricalData();
    const intervalId = setInterval(fetchHistoricalData, 5000);
    return () => clearInterval(intervalId);
  }, [selectedStock]);

  const calculateEMA = (data, period) => {
    const multiplier = 2 / (period + 1);
    return data.reduce((ema, value, index) => (index === 0 ? value : (value - ema) * multiplier + ema), 0);
  };

  const calculateVWAP = () => {
    const totalValue = priceData.reduce((sum, price, index) => sum + price * volumeData[index], 0);
    const totalVolume = volumeData.reduce((sum, volume) => sum + volume, 0);
    return totalValue / totalVolume;
  };

  const generateSignals = () => {
    const lastPrice = priceData[priceData.length - 1];
    const shortEMA = calculateEMA(priceData.slice(-strategyParameters.shortEmaPeriod), strategyParameters.shortEmaPeriod);
    const longEMA = calculateEMA(priceData.slice(-strategyParameters.longEmaPeriod), strategyParameters.longEmaPeriod);
    const vwap = calculateVWAP();

    if (lastPrice > vwap && shortEMA > longEMA && volumeData[volumeData.length - 1] > strategyParameters.volumeThreshold) {
      return 'Buy';
    } else if (lastPrice < vwap && shortEMA < longEMA && volumeData[volumeData.length - 1] > strategyParameters.volumeThreshold) {
      return 'Sell';
    } else {
      return 'Hold';
    }
  };

  const handleGenerateSignals = () => {
    const signal = generateSignals();
    setGeneratedSignals([signal]);
  };

  return (
    <div className="trading-controls">
      <header className="trading-controls__header">
        <h1>The Cauldron</h1>
        <Link to="/" className="watchlist__dashboard-button">
          Dashboard
        </Link>
      </header>

      <div className="trading-controls__stock-selection">
        <label>
          Select Stock from Watchlist:
          <select onChange={(e) => setSelectedStock(e.target.value)} value={selectedStock || ''}>
            <option value="" disabled>Select a stock</option>
            {watchlist?.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="trading-controls__parameters">
        <label>
          Short EMA Period:
          <input
            type="number"
            value={strategyParameters.shortEmaPeriod}
            onChange={(e) => handleParameterChange('shortEmaPeriod', e.target.value)}
          />
        </label>

        <label>
          Long EMA Period:
          <input
            type="number"
            value={strategyParameters.longEmaPeriod}
            onChange={(e) => handleParameterChange('longEmaPeriod', e.target.value)}
          />
        </label>

        <label>
          Volume Threshold:
          <input
            type="number"
            value={strategyParameters.volumeThreshold}
            onChange={(e) => handleParameterChange('volumeThreshold', e.target.value)}
          />
        </label>
      </div>

      <button className="generate-signals-button" onClick={handleGenerateSignals}>
        Generate Signals
      </button>

      <div className="signals-placeholder">
        {/* Display generated signals */}
        <h2>Generated Signals:</h2>
        <ul>
          {generatedSignals.map((signal, index) => (
            <li key={index}>{signal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradingControls;
