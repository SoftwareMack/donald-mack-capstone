Donald Mack Capstone - The Stock Wizard
Overview
The Stock Wizard is a financial application designed to simplify stock and options trading by providing automatic stock picks based on technical analysis indicators such as Moving Averages (MA), Relative Strength Index (RSI), and Volume. The app aims to cater to users who seek automated trading solutions for swing trades and lack the time or expertise to perform detailed market analysis.

Problem
Many individuals interested in stock trading face challenges in understanding and implementing technical analysis, often missing trading opportunities due to the complexity involved. The Stock Wizard addresses this issue by automating the stock selection process, providing users with buy, hold, or sell signals based on predefined technical criteria.

User Profile
The app targets users looking for automated stock picks, specifically swing trades. The primary user group includes individuals who want to engage in stock trading without delving into the intricate details of market analysis. The app accommodates users who lack the time or knowledge to perform complex mathematical calculations for trading decisions.

Features
1. dashboard Component
allows the user click a button an go to specific component.

2. Trading Controls Page
Technical Analysis Selection: Enables users to customize technical analysis settings for stock and option selection.
3. Stock List Page
Display Custom Watchlist: Displays the user's custom watchlist of stocks and stock options from the S&P 500.
4. Signal Indicator Page
Buy/Sell/Hold Signals: Displays buy, sell, or hold signals based on specified technical analysis conditions.
There is a orderform that allows to place a papertrade
a portfolio page that shows the account value an open trades
Implementation
Tech Stack
React: JavaScript library for building user interfaces.
React Router: Standard library for routing in React applications.
Chart.js or D3.js: Visualization libraries for rendering real-time stock and options charts.
Axios: HTTP client for making requests to APIs.
Node: JavaScript runtime for server-side development.
Sass: CSS preprocessor for styling.
APIs
Alpha Vantage API: Fetches real-time stock and options data.
Sitemap
Dashboard: Central hub with links to other pages.
Trading Controls: Customizable technical analysis settings.
Stock List: Display of custom watchlist.
Signal Indicator: Buy/sell/hold signals.
Login: User authentication component.
Mockups
Visual representations of app screens using tools like Figma.
Data
Stock and options data retrieved from external APIs.
Technical analysis data calculated based on specific indicators.
Endpoints
authRoutes.js: User authentication routes.
stockRoutes.js: Routes for fetching stock-related data.
optionRoutes.js: Routes for fetching options-related data.
Controllers: Logic for authentication and data fetching operations.
Middleware: User authentication middleware.
Database Models: Define models for user data, stock data, and options data.
External API Wrapper: Handles requests to external APIs.
.env: Stores sensitive information like API keys.
Auth
User login and profile functionality to be implemented.
Specifics of authentication/authorization yet to be decided.

Conduct thorough testing and debugging.
Nice-to-Haves
fully functionable buy sell ooorderform page Upload Page with Spinner: Allow users to upload information with a loading spinner.
Settings Page and Portfolio Page: Additional pages for user customization and portfolio management. Login page all coming soon
