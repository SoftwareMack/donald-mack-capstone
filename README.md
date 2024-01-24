# donald-mack-capstone

# Project Title
The Stock Wizard
## Overview

What is your app? Brief description in a couple of sentences. Ill be making an app that shows current stock options. with a buy now alert and sell now alert. It'll choose the picks based off MA's Rsi,Volume.

### Problem

Why is your app needed? Background information around any pain points or other reasons. It is needed because alot of people want to trade stocks or options but can't wrap their head around the math. By the time you understand some of the basics of trading the trade has passed you by.

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account. it'll be aimed at those who want automatic stock picks preferably swing trades.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.
 allows the user to create a watchlist of certain stocks and stock options from the s&p 500 and provides the user a buy hold sell signal alert for individual stocks and options on the watchlist base of technical  analysis  over a given time period.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations. I will use React, Html, Javascript, expres.js, sass, possibly an outside api possibly a database for storing user data and maybe historical data  . ja

### APIs

List any external sources of data that will be used in your app. a financial api or a stock api ex. yahoo,alpha stocks, chartsia.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out. there will be a dashboard page that has link for the rest of the pages.

 there will be a trading controls page that has the technical anaylisis selection selection. A stocklist page that displays the custum watchlist. A signal indicator page shows the buy sell hold signals.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

the data for the graphs will come an values from a api and displayed on the charts. the data for basing technical analysis will come from an api and and put thru my calculations for rsi volume etc. to determine the buy sell hold signals.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.


GET /posts: Retrieve a list of s&p 500 stocks or option .
GET /posts/{id}: Retrieve details of a specific stock or option .
POST /posts: Create a new watchlist post.
PUT /posts/{id}: Update an existing watchlist post with the given ID
### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

yes. but authentication/authorization hasn't been decided yet.
## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build. I plan 2 sprints for this project and a 2 day test and debugging period for it. Sprint one day one getting all the images and assets and libraries needed to start.the remainder of sprint one include would include building the front end out. sprint two will consist of the back end and linking and passing info to the from and back. final 2 days to test and debug.

## Nice-to-haves
upload page with the a spinner.. settings page and portfolio page. 

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.
