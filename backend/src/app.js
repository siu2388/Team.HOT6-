const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, HOT6');
});

module.exports = app;
