// StockCharts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';
import './StockCharts.scss'; // Import the corresponding SCSS file

const StockCharts = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'candlestick',
        height: 350,
      },
      title: {
        text: 'Real-Time Stock Charts',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  });

  useEffect(() => {
    // Fetch real-time stock data from an external API
    const fetchData = async () => {
      try {
        const response = await axios.get('YOUR_STOCK_API_ENDPOINT');
        // Parse and format the data as needed
        const formattedData = response.data.map((item) => ({
          x: new Date(item.timestamp),
          y: [item.open, item.high, item.low, item.close],
        }));
        setChartData({
          series: [
            {
              data: formattedData,
            },
          ],
          options: chartData.options,
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch data on component mount
    fetchData();

    // Set up interval to fetch data periodically
    const interval = setInterval(fetchData, 60000); // Update every minute

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className="stock-charts-container">
      <ApexChart
        options={chartData.options}
        series={chartData.series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default StockCharts;
