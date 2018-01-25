const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      Task = require('./api/models/todoListModel'), //created model loading here
      routes = require('./api/routes/todoListRoutes');

const app = express(),
      port = process.env.PORT,
      connectionString = process.env.MONGODB_CONNECTION;

if(!connectionString){
    console.log('MongoDB connection string not found. \nConnection should be set in environment variable MONGODB_CONNECTION');
    return;
}

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(function (req, res) {
    console.log('Request url: ' + req.originalUrl + '\n');
    res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port);
console.log('todo list RESTful API Server started on: ' + port);
