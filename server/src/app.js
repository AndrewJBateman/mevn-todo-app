// import dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express(); // create your express app

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const uri = process.env.DB_URI;
console.log(uri);
var client;

var mongoClient = new MongoClient(
  uri, 
    { 
      reconnectTries : Number.MAX_VALUE, 
      autoReconnect : true, 
      useNewUrlParser : true 
    }
) // allows for connection to the db

mongoClient.connect((err, db) => { // returns a connection to the mongodb
  if (err != null) {
    console.log(err)
    return
  }
  client = db
  console.log("connected");
})

// make app use dependencies
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// define post route 
app.post('/addTodo', (req, res) => {
  const collection = client.db('test').collection('todos')
  var todo = req.body.todo // parse the data from the request's body
  collection.insertOne({title: todo}, function (err, results) {
    if (err) {
      console.log(err);
      res.send('');
      return;
    }
    res.send(results.ops[0]) // returns the new document
    console.log(results.ops);
  });
});

// define route for deleting a todo 
app.post('/deleteTodo', (req, res) => {
  const collection = client.db('test').collection('todos')
  // remove document by its unique _id
  collection.removeOne({'_id': mongo.ObjectID(req.body.todoID)}, function (err, results) {
    if (err) {
      console.log(err)
      res.send('')
      return
    }
    res.send() // return
  })
})

// define route to get a todo
app.get('/todo', (req, res) => {
  const collection = client.db("test").collection("todos");
  collection.find().toArray(function (err, results) {
    if (err) {
      console.log(err);
      res.send([]);
      return;
    }
    res.send(results);
  })
})

app.listen(process.env.PORT || 8082) // client is already running on 8080