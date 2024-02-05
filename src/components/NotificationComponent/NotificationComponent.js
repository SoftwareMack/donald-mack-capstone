
// StockNotification.js

import React, { useState, useEffect } from 'react';
import './NotificationComponent.scss';

const StockNotification = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = '3BLPG03TNFMQYCQ2';
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {

        if (data && data['Time Series (1min)']) {

          const newsList = Object.entries(data['Time Series (1min)']).map(([timestamp, stockData]) => {
            return {
              title: `The Wizardz Gazette - Stock Update at ${timestamp}`,
              description: `Open: ${stockData['1. open']}, High: ${stockData['2. high']}, Low: ${stockData['3. low']}, Close: ${stockData['4. close']}`,
              url: '#',
            };
          });

          setNews(newsList);
        }
      })
      .catch((error) => console.error('Error fetching stock news:', error))
      .finally(() => setLoading(false));
  }, []); 

  return (
    <div className="stock-notification">
      <h2>The Wizardz Gazette</h2>
      <a href="/" className="dashboard-button">Dashboard</a>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <strong>{article.title}</strong>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockNotification;
