Donald Mack Capstone - The Stock Wizard Overview The Stock Wizard is a financial application designed to simplify stock and options trading by providing automatic stock picks based on technical analysis indicators such as Moving Averages (MA), Relative Strength Index (RSI), and Volume. The app aims to cater to users who seek automated trading solutions for swing trades and lack the time or expertise to perform detailed market analysis.

Problem Many individuals interested in stock trading face challenges in understanding and implementing technical analysis, often missing trading opportunities due to the complexity involved. The Stock Wizard addresses this issue by automating the stock selection process, providing users with buy, hold, or sell signals based on predefined technical criteria.

User Profile The app targets users looking for automated stock picks, specifically swing trades. The primary user group includes individuals who want to engage in stock trading without delving into the intricate details of market analysis. The app accommodates users who lack the time or knowledge to perform complex mathematical calculations for trading decisions.

Features

dashboard Component allows the user click a button an go to specific component.

Trading Controls Page Technical Analysis Selection: Enables users to customize technical analysis settings for stock and option selection.

Stock List Page Display Custom Watchlist: Displays the user's custom watchlist of stocks and stock options from the S&P 500.

Signal Indicator Page Buy/Sell/Hold Signals: Displays buy, sell, or hold signals based on specified technical analysis conditions. There is a orderform that allows to place a papertrade a portfolio page that shows the account value an open trades Implementation Tech Stack React: JavaScript library for building user interfaces. React Router: Standard library for routing in React applications. Chart.js or D3.js: Visualization libraries for rendering real-time stock and options charts. Axios: HTTP client for making requests to APIs. Node: JavaScript runtime for server-side development. Sass: CSS preprocessor for styling. APIs Alpha Vantage API: Fetches real-time stock and options data. Sitemap Dashboard: Central hub with links to other pages. Trading Controls: Customizable technical analysis settings. Stock List: Display of custom watchlist. Signal Indicator: Buy/sell/hold signals. Login: User authentication component. Mockups Visual representations of app screens using tools like Figma. Data Stock and options data retrieved from external APIs. Technical analysis data calculated based on specific indicators. Endpoints authRoutes.js: User authentication routes. stockRoutes.js: Routes for fetching stock-related data. optionRoutes.js: Routes for fetching options-related data. Controllers: Logic for authentication and data fetching operations. Middleware: User authentication middleware. Database Models: Define models for user data, stock data, and options data. External API Wrapper: Handles requests to external APIs. .env: Stores sensitive information like API keys. Auth User login and profile functionality to be implemented. Specifics of authentication/authorization yet to be decided.

Conduct thorough testing and debugging. Nice-to-Haves fully functionable buy sell ooorderform page Upload Page with Spinner: Allow users to upload information with a loading spinner. Settings Page and Portfolio Page: Additional pages for user customization and portfolio management. Login page all coming soon

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
