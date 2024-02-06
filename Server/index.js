const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/StockWizardz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const watchlistSchema = new mongoose.Schema({
  name: String,
  openingPrice: Number,
  closingPrice: Number,
  currentPrice: Number,
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

const apiKey = 'ALPHA_VANTAGE_API_KEY';

const fetchStockData = async (symbol) => {
  const interval = '1min';
  const { default: fetch } = await import('node-fetch');
  const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`);
  const data = await response.json();
  return data['Time Series (1min)'];
};

app.get('/api/watchlist', async (req, res) => {
  try {
    const watchlistData = await Watchlist.find();
    res.json(watchlistData);
  } catch (error) {
    console.error('Error fetching watchlist data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/watchlist/add', async (req, res) => {
  const newStockInfo = req.body;
  try {
    const stockData = await fetchStockData(newStockInfo.name);
    newStockInfo.openingPrice = parseFloat(stockData[Object.keys(stockData)[0]]['1. open']);
    newStockInfo.closingPrice = parseFloat(stockData[Object.keys(stockData)[1]]['4. close']);
    const addedStock = await Watchlist.create(newStockInfo);
    res.status(201).json(addedStock);
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
