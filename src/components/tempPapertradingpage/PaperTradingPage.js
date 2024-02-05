import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PortfolioSummaryComponent from '../tempPortfolioSummaryComponent/PortfolioSummaryComponent';
import OrderForm from '../tempOrderForm/OrderForm';
import TransactionHistory from '../tempTransactionHistory/TransactionHistory';
import './PaperTradingPage.scss';

const PaperTradingPage = () => {
  const [loading, setLoading] = useState(true);
  const [cashBalance, setCashBalance] = useState(5000);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchPaperTradingData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/paper-trading-portfolio');
        if (!response.ok) {
          throw new Error(`Failed to fetch paper trading data. Status: ${response.status}`);
        }
        const paperTradingData = await response.json();
        setCashBalance(paperTradingData.cashBalance);
        setTransactionHistory(paperTradingData.transactionHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching paper trading data:', error);
        setLoading(false);
      }
    };

    fetchPaperTradingData();
  }, []);

  return (
    <div className="paper-trading-page light-theme">
      <header className="paper-trading-page__header">
        <h1>The Wizardz Chest</h1>
        <Link to="/" className="back-to-dashboard-button">
          <button type="button">Back to Dashboard</button>
        </Link>
      </header>

      {loading && (
        <div className="loading-state">
          <p>Loading paper trading data...</p>
        </div>
      )}

      {!loading && (
        <div className="paper-trading-page__content">
          <PortfolioSummaryComponent cashBalance={cashBalance} />

          {/* Display my my order form for paper trading */}
          <OrderForm cashBalance={cashBalance} />

          {/* Displaymy  transaction history for paper trading */}
          <div className="transaction-history">
            <h2>Transaction History</h2>
            <TransactionHistory transactions={transactionHistory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperTradingPage;
