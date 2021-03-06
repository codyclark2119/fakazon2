const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Init Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Including the routes
app.use(require('./routes/index.js'));

// Setting up mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fakazon');

// Starting up the server
app.listen(PORT, () =>
  console.log(`The server started on http://localhost:${PORT}`)
);
