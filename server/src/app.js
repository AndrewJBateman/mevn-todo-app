// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express(); // create your express app

// make app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// define a route
app.get('/todo', (req, res) => {
  res.send([
    'Thing 1',
    'Thing 2',
    'Thing 3',
    'Thing 4'
  ]);
});

app.listen(process.env.PORT || 8082) // client is already running on 8080