import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChartWidget from '../StockChart/StockChart';
import './StockList.scss';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchlistData();
  }, []);

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

      if (data['Time Series (1min)']) {
        const openingPrice = parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[0]]['1. open']);
        const closingPrice = parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[1]]['4. close']);
        const currentPrice = parseFloat(data['Time Series (1min)'][Object.keys(data['Time Series (1min)'])[0]]['4. close']);

        const newStockInfo = {
          id: watchlist.length + 1,
          name: symbol,
          openingPrice,
          closingPrice,
          currentPrice,
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
      } else {
        throw new Error('Failed to fetch stock data. Time Series (1min) is undefined.');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      alert('Failed to fetch stock data. Please try again later.');
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
      </div>
      <ul className="watchlist__list">
        <li className="watchlist__item watchlist__labels">
          <span className="watchlist__label1">Name</span>
          <span className="watchlist__label2">Open</span>
          <span className="watchlist__label3">Close</span>
          <span className="watchlist__label4">Current Price</span>
          <span className="watchlist__label5">Actions</span>
        </li>
        {watchlist.map((asset) => (
          <li key={asset["_id"]} className="watchlist__item">
            <span className="watchlist__name">{asset.name}</span>
            <span className="watchlist__price1">${asset.openingPrice}</span>
            <span className="watchlist__price2">${asset.closingPrice}</span>
            <span className="watchlist__price3">${asset.currentPrice}</span>
            <div className="watchlist__actions">
              <button className="watchlist__remove-button" onClick={() => removeFromWatchlist(asset["_id"])}>
                Remove
              </button>
              <button className="watchlist__view-chart-button" onClick={() => viewChart(asset.name)}>
                View Chart
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedSymbol && <ChartWidget symbol={selectedSymbol} onCloseChart={() => setSelectedSymbol('')} />}


<footer className="watchlist__footer">
  <p>Copyright 2024 | Created by Donald Mack</p>
  <a href="https://www.linkedin.com/in/softwaremack/" target="_blank" rel="noopener noreferrer" className="footer__social footer__social--linkedin"></a>
  <a href="https://github.com/SoftwareMack" target="_blank" rel="noopener noreferrer" className="footer__social footer__social--github"></a>
</footer>
    </div>
  );
};

export default Watchlist;
