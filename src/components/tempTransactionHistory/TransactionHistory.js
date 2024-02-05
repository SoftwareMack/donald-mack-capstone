// TransactionHistory.js

import React from 'react';

const TransactionHistory = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions to display.</p>;
  }

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <strong>{transaction.timestamp || 'N/A'}</strong> - {transaction.stockSymbol || 'N/A'} (
            {transaction.quantity || 'N/A'} shares) - {transaction.orderType || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
