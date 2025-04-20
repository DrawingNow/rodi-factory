const express = require('express');
const cors = require('cors');
const errorRoutes = require('./routes/errors');

const app = express();
const PORT = 5002;

app.use(cors());
app.use('/api/errors', errorRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'hello world!' });
});

app.listen(PORT);

module.exports = app;
