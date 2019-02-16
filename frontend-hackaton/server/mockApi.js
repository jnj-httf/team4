const express = require('express');
const api = express();
const ubsData = require('./ubs');

// create new watchlist
api.post('/ubs', (req, res) => {
  res.json(ubsData);
});

module.exports = api;
