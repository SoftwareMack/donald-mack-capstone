// Watchlist.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChartWidget from '../StockChart/StockChart';
import './StockList.scss';

const Watchlist = () => {

  const [watchlist, setWatchlist] = useState([]);
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [replaceStockSymbol, setReplaceStockSymbol] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const navigate = useNavigate();


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

  
  useEffect(() => {
    fetchWatchlistData();
  }, []);


  const removeFromWatchlist = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/watchlist/remove/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to remove stock from watchlist. Status: ${response.status}`);
      }

      const updatedWatchlist = watchlist.filter((asset) => asset["_id"] !== id);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Error removing stock from watchlist:', error);
    }
  };

  // Replace a stock in the watchlist with a new symbol
  const replaceStock = async (id) => {
    if (replaceStockSymbol.trim() === '') {
      alert('Please enter a stock symbol to replace.');
      return;
    }

    if (watchlist.some((asset) => asset.name === replaceStockSymbol.toUpperCase())) {
      alert('Stock is already in the watchlist.');
      return;
    }

    try {

      const apiKey = '3BLPG03TNFMQYCQ2';
      const symbol = replaceStockSymbol.toUpperCase();
      const interval = '1min';
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`);
      const data = await response.json();

      const updatedWatchlist = watchlist.map((asset) => {
        if (asset["_id"] === id) {
          return {
            ...asset,
            name: symbol,
            openingPrice: parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[0]]['1. open']),
            closingPrice: parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[1]]['4. close']),
          };
        }
        return asset;
      });

      setWatchlist(updatedWatchlist);
      setReplaceStockSymbol('');
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };


  const addToWatchlist = async () => {
    if (newStockSymbol.trim() === '') {
      alert('Please enter a stock symbol.');
      return;
    }

    if (watchlist.length >= 5) {
      alert('You can only have up to 5 stocks in your watchlist.');
      return;
    }

    if (watchlist.some((asset) => asset.name === newStockSymbol.toUpperCase())) {
      alert('Stock is already in the watchlist.');
      return;
    }

    try {

      const apiKey = '3BLPG03TNFMQYCQ2';
      const symbol = newStockSymbol.toUpperCase();
      const interval = '1min';
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`);
      const data = await response.json();

      const newStockInfo = {
        id: watchlist.length + 1,
        name: symbol,
        openingPrice: parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[0]]['1. open']),
        closingPrice: parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[1]]['4. close']),
        currentPrice: parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[0]]['4. close']),
      };


      const responseAdd = await fetch('http://localhost:8000/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStockInfo),
      });


      if (!responseAdd.ok) {
        throw new Error(`Failed to add stock to watchlist. Status: ${responseAdd.status}`);
      }


      await fetchWatchlistData();


      setNewStockSymbol('');
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };


  const viewChart = (symbol) => {
    setSelectedSymbol(symbol);
  };


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  const containerClassName = `watchlist ${darkMode ? 'dark-theme' : 'light-theme'}`;


  return (
    <div className={containerClassName}>
      <div className="watchlist__header">
        <h1 className="watchlist__list-title">The Fortune List</h1>
        <Link to="/" className="watchlist__dashboard-button">
          Dashboard
        </Link>
        <button className={`watchlist__toggle-dark-mode ${darkMode ? 'dark-mode' : 'light-mode'}`} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="watchlist__actions">
        {/* Section to add a new stock to the watchlist */}
        <div className="watchlist__add-stock">
          <input
            type="text"
            placeholder="Enter Stock Symbol"
            value={newStockSymbol}
            onChange={(e) => setNewStockSymbol(e.target.value)}
          />
          <button className="watchlist__add-button" onClick={addToWatchlist}>
            Add Stock
          </button>
        </div>
        {/* Section to replace myy existing stock in the watchlist */}
        <div className="watchlist__replace-stock">
          <input
            type="text"
            placeholder="Enter Stock Symbol to Replace"
            value={replaceStockSymbol}
            onChange={(e) => setReplaceStockSymbol(e.target.value)}
          />
          <button
            className="watchlist__replace-button"
            onClick={() => replaceStock(watchlist.length)}
          >
            Replace Stock
          </button>
        </div>
      </div>
      {/* Display the list of stocks in the watchlist */}
      <ul className="watchlist__list">
        <li className="watchlist__item watchlist__labels">
          <span className="watchlist__label">Name</span>
          <span className="watchlist__label">Open</span>
          <span className="watchlist__label">Close</span>
          <span className="watchlist__label">Current Price</span>
          <span className="watchlist__label">Actions</span>
        </li>
        {watchlist.map((asset) => (
          <li key={asset["_id"]} className="watchlist__item">
            <span className="watchlist__name">{asset.name}</span>
            <span className="watchlist__price">${asset.openingPrice}</span>
            <span className="watchlist__price">${asset.closingPrice}</span>
            <span className="watchlist__price">${asset.currentPrice}</span>
            <div className="watchlist__actions">
              {/* Button to remove a stock from the watchlist */}
              <button
                className="watchlist__remove-button"
                onClick={() => removeFromWatchlist(asset["_id"])}
              >
                Remove
              </button>
              {/* Button to view the chart for a stock */}
              <button
                className="watchlist__view-chart-button"
                onClick={() => viewChart(asset.name)}
              >
                View Chart
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Display the chart widget for the selected stock symbol */}
      {selectedSymbol && <ChartWidget symbol={selectedSymbol} onCloseChart={() => setSelectedSymbol('')} />}
    </div>
  );
};

export default Watchlist;
