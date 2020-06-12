const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Create our express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Cors Middleware
app.use(cors());
// Will allow us to parse JSON as our server will receive and send JSON
app.use(express.json());

// Get DB URI from MongoDB Atlas Dashboard
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

// Require the routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Use the routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Starts the server
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});