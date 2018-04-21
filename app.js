const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Zomato = require('zomato.js');
const zomato = new Zomato('06ee630b8e99f41cda6b1db3b9b63cd9');
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.use(cors());

// import db model
require('./models/Vote');
const Vote = mongoose.model('Vote');

// index route
app.get('/', (req, res) => {
  res.send("Hello Chad");
});

// restaurant information
app.get('/food', (req, res) => {
  zomato
  .search({
    q: '',
    count: 9,
    lat: -27.458201,
    lon: 153.034288,
    radius: 1000,
    sort: 'real_distance'
  })
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

// vote
app.post('/vote', async (req, res) => {
  const data = req.body;
  if (req.body) {
    console.log(data);
    await Vote.findOneAndUpdate({name: req.body.name}, { $inc: {tally: 1}}, {upsert: true}).exec();
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});


// start and run server on port 3000
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});