import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

let tvScriptLoadingPromise;

const ChartWidget = ({ symbol, onNavigateToDashboard }) => {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (document.getElementById('tradingview_a5575') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: '5',
          timezone: 'America/New_York',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_a5575'
        });
      }
    }
  }, [symbol]);

  const handleNavigateToDashboard = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  return (
    <div className='chart-widget'>
      <div className="chart-widget__header">
        <h1 className="chart-widget__title">The Wizardz Eye</h1>
        <Link to="/" className="chart-widget__dashboard-link">
          Dashboard
        </Link>
      </div>
      <div id='tradingview_a5575' className="chart-widget__chart" style={{ height: '600px' }} />
      <div className="chart-widget__copyright">
        <a href={`https://www.tradingview.com/symbols/${symbol}/`} rel="noopener noreferrer" target="_blank">
          <span className="chart-widget__symbol blue-text">{symbol} stock chart</span>
        </a> by TradingView
      </div>
    </div>
  );
};

export default ChartWidget;
