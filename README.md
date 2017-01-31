# liveTracker

Capstone project for Treehouse Techdegree.

*Mason Embry - mason@embrycode.com*

## Project Instructions

*From Treehouse-* In this final, "Capstone" project, you'll bring together everything you've learned to create your own web application. You'll need to build all aspects of the site including an interactive front end. On the backend you'll manage data with a database and talk to at least two other web sites by connecting to their APIs. Finally, you'll host this site on the web so the world can see your finished, running web application.

You can build this project using any of the technologies you've learned so far such as Angular, and the MEAN stack, a relational database like MySQL, a document-based database like MongoDB, Bootstrap, jQuery, Express, and Node. Please don't use backend frameworks that we haven't taught in the Techdegree, such as Koa, Sails, or Meteor. You can use any front end libraries and frameworks.

## Description

This app makes it easy to retrieve your top 20 favorite artists from Spotify and search JamBase for concerts in your area using your zip code. It is a MEAN app built using the following technologies:

1. Frontend
  * Angular 1
  * Bower
  * Bootstrap
2. Backend
  * Mongo and Mongoose
  * Express
  * Node.js
3. APIs
  * Spotify
  * JamBase
4. Modules
  * node-jambase
  * passport-spotify
  * spotify-web-api-node

## Installation

1. Run `npm install`.
2. Add your api keys to `config/apiConfigEXAMPLE.js` and rename to `apiConfig.js`.
3. Setup your local Mongo database and enter path in `config/db.js`.
4. Run `npm start` or `nodemon` at project root.

See a live version at https://live-tracker.herokuapp.com/
