const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5002;

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'hello world!' });
});

module.exports = app;
