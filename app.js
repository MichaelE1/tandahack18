const express = require('express');
const app = express();
const mongoose = require('mongoose');

// import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// index route
app.get('/', (req, res) => {
  res.send("Hello Chad");
});

// start and run server on port 3000
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});