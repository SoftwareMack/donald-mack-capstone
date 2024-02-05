
// OrderForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderForm.scss';

const OrderForm = ({ onPlaceOrder }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy');

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

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStock || !quantity) {
      alert('Please select a stock and enter a valid quantity.');
      return;
    }

    onPlaceOrder({
      stock: selectedStock,
      quantity: parseInt(quantity),
      orderType,
    });

    setSelectedStock('');
    setQuantity('');
    setOrderType('buy');
  };

  return (
    <div className="order-form">
      <h2>The Wizardz Wand - Paper Trading Order Form</h2>
      <form onSubmit={handleOrderSubmit}>
        <label>
          Select Stock:
          <select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
            <option value="">Select a stock</option>
            {watchlist.map((stock) => (
              <option key={stock._id} value={stock.name}>
                {stock.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label>
          Order Type:
          <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <button type="submit">Place Order</button>

        {/* Dashboard button */}
        <Link to="/">
          <button type="button">Dashboard</button>
        </Link>
      </form>
    </div>
  );
};

export default OrderForm;
