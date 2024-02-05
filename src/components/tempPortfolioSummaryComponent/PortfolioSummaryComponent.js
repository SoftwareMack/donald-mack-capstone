import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PortfolioSummaryComponent.scss';

const PortfolioSummaryComponent = (props) => {
  const { openPositions } = props;

  const [cashBalance, setCashBalance] = useState(5000);
  const [totalValue, setTotalValue] = useState(cashBalance);
  useEffect(() => {
    const calculatedTotalValue = cashBalance + calculateOpenPositionsValue(openPositions);

    setTotalValue(calculatedTotalValue);
  }, [openPositions, cashBalance]);

  const calculateOpenPositionsValue = (positions) => {
    if (!positions || positions.length === 0) {
      return 0;
    }

    const totalValue = positions.reduce((total, position) => {
      if (position && position.quantity && position.currentPrice) {
        const positionValue = position.quantity * position.currentPrice;
        return total + positionValue;
      } else {
        return total;
      }
    }, 0);

    return totalValue;
  };

  return (
    <div className="portfolio-summary-component">
      <h2>The Wizardz Bag</h2>

      {/* Display total value, cash balance, and other summary information */}
      <div className="summary-info">
        <p>Total Value: ${totalValue.toFixed(2)}</p>
        <p>Cash Balance: ${cashBalance.toFixed(2)}</p>
        {/* Display additional summary information here */}
      </div>

      {/* Display open positions if any */}
      <div className="open-positions">
        <h3>Open Positions</h3>
        {openPositions && openPositions.length > 0 ? (
          openPositions.map((position) => (
            <div key={position.symbol}>
              <p>{position.symbol}: {position.quantity} shares</p>
              {/* Additional information for each open position */}
            </div>
          ))
        ) : (
          <p>No open positions</p>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <Link to="/" className="dashboard-button">
          <button type="button">Dashboard</button>
        </Link>
        <Link to="/paper-trading" className="trading-button">
          <button type="button">Trading</button>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioSummaryComponent;
