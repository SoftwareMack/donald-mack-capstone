import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SignalIndicator.scss';

const SignalIndicator = () => {
  const location = useLocation();
  const selectedItems = new URLSearchParams(location.search).get('items');
  console.log(selectedItems);
  const [signals, setSignals] = useState({});
  const [selectedItemsArray, setSelectedItemsArray] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/watchlist');
        if (!response.ok) {
          throw new Error(`Failed to fetch watchlist data. Status: ${response.status}`);
        }
        const watchlistData = await response.json();
        setWatchlist(watchlistData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
        setError('Failed to fetch watchlist data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, []);

  useEffect(() => {
    //if (selectedItems && watchlist.length > 0) {
     // const itemsArray = selectedItems.split(',');
      //setSelectedItemsArray(itemsArray);

      const generateSignals = () => {
        const signalsData = {};

        watchlist.forEach((item) => {
          //const item = watchlist.find((stock) => stock.name === item);
         console.log(item)
          if (item && item.currentPrice) {
            const shortTermEMA = calculateEMA(item.currentPrice, 9);
            const longTermEMA = calculateEMA(item.currentPrice, 21);

            if (shortTermEMA > longTermEMA) {
              signalsData[item.name] = 'buy';
            } else if (shortTermEMA < longTermEMA) {
              signalsData[item.name] = 'sell';
            } else {
              signalsData[item.name] = 'hold';
            }
          }
        });

        setSignals(signalsData);
      };

      generateSignals();
    //}
  }, [selectedItems, watchlist]);

  const calculateEMA = (data, period) => {
    const alpha = 2 / (period + 1);
    console.log(data)
    let ema = data;

    //for (let i = 1; i < period; i++) {
      //ema = alpha * data[i].close + (1 - alpha) * ema;
    //}

    return ema;
  };
  console.log(signals)
  return (
    <div className="signal-indicator">
      <Link to="/" className="back-to-dashboard-button">
        <button type="button">Back to Dashboard</button>
      </Link>
      <header className="signal-indicator__header">
        <h1 className="signal-indicator__title">Abracadabra</h1>
      </header>
      {loading && (
        <div className="loading-state">
          <p>Loading watchlist data...</p>
        </div>
      )}
      {error && (
        <div className="error-state">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && watchlist.length === 0 && (
        <p>No stocks or options selected.</p>
      )}
      {!loading && !error && watchlist.length > 0 && (
        <ul className="signal-indicator__items">
          {watchlist.map((item) => (
            <li key={item.name} className="signal-indicator__item">
              {item.name}
              <div className="signal-indicator__buttons">
                <button className={`buy ${signals[item.name] === 'buy' && ' blinking-green'}`}>
                  {signals[item.name] === 'buy' ? 'BUY' : 'Buy'}
                </button>
                <button className={`sell ${signals[item.name] === 'sell' && ' blinking-red'}`}>
                  {signals[item.name] === 'sell' ? 'SELL' : 'Sell'}
                </button>
                <button className={`hold ${signals[item.name] === 'hold' && ' blinking'}`}>
                  {signals[item.name] === 'hold' ? 'HOLD' : 'Hold'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SignalIndicator;
