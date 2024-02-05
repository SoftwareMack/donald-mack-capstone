// TradingControls.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TradingControls.scss'; 

const TradingControls = ({ onBackToDashboard }) => {
  const [strategyParameters, setStrategyParameters] = useState({
    shortEmaPeriod: 9,
    longEmaPeriod: 21,
    volumeThreshold: 1000000,
  });

  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [generatedSignals, setGeneratedSignals] = useState([]);

  const handleParameterChange = (parameter, value) => {
    setStrategyParameters((prevParameters) => ({
      ...prevParameters,
      [parameter]: value,
    }));
  };

  const fetchHistoricalData = () => {
    const historicalPrices = [100, 105, 98, 110, 120, 115, 130, 125, 140, 135];
    const historicalVolumes = [500000, 550000, 480000, 600000, 700000, 650000, 800000, 750000, 900000, 850000];

    setPriceData(historicalPrices);
    setVolumeData(historicalVolumes);
  };

  useEffect(() => {
    fetchHistoricalData();
    const intervalId = setInterval(fetchHistoricalData, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
