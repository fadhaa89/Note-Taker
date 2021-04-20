
//Configure Server: Set Port
var PORT = process.env.PORT || 3000;
// const router = require('express').Router();
const express = require("express");
const app = express(); 
const fs = require('fs');
const path = require('path');
//to get the APIROUTES
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Sets up the Express app data parsing
app.use(express.urlencoded({
    extended: true
}));
//Serve up static assets from public
app.use(express.static('public'));
app.use(express.json());

//api
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Listener
app.listen(PORT, () => {
    console.log(`API server is on Port now ${PORT}!`);
});