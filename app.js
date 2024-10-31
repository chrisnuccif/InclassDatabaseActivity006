const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// middleware to parse JSON
app.use(bodyParser.json());

// mongoDB connection
mongoose.connect('mongodb://localhost:27017/yourDatabaseName')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


// sample route (just to test the server)
app.get('/', (req, res) => {
  res.send('Hello, this server is connected to MongoDB!');
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
