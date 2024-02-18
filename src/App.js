import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from '../src/components/DashboardPage/DashboardPage';
import StockChart from '../src/components/StockChart/StockChart';
import StockList from '../src/components/StockList/StockList';
import SignalIndicator from './components/SignalIndicator/SignalIndicator';
import TradingControls from './components/TradingControls/TradingControls';
import NotificationComponent from './components/NotificationComponent/NotificationComponent';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';


const App = () => {
  const isHomePage = true;

  return (
    <Router>
      <Routes>
        {isHomePage && (
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <DashboardPage />
              </ErrorBoundary>
            }
          />
        )}
        <Route path="/stock-chart" element={<StockChart />} />
        <Route path="/stock-list" element={<StockList />} />
        <Route path="/signal-indicator" element={<SignalIndicator />} />
        <Route path="/trading-controls" element={<TradingControls />} />
        <Route path="/notifications" element={<NotificationComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
