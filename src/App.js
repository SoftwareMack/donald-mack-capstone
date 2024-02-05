import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from '../src/components/DashboardPage/DashboardPage';
import StockChart from '../src/components/StockChart/StockChart';
import StockList from '../src/components/StockList/StockList';
import SignalIndicator from './components/SignalIndicator/SignalIndicator';
import TradingControls from './components/TradingControls/TradingControls';
import NotificationComponent from './components/NotificationComponent/NotificationComponent';
import PaperTradingPage from './components/tempPapertradingpage/PaperTradingPage';
import PortfolioSummaryComponent from './components/tempPortfolioSummaryComponent/PortfolioSummaryComponent';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import OrderForm from './components/tempOrderForm/OrderForm';

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
        <Route path="/paper-trading" element={<PaperTradingPage />} />
        <Route path="/portfolio-summary" element={<PortfolioSummaryComponent />} />

{/* New route for OrderForm */}
        <Route path="/order-form" element={<OrderForm />} />
      </Routes>
    </Router>
  );
};

export default App;
