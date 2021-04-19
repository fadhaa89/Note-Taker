
//Configure Server: Set Port
var PORT = process.env.PORT || 3000;
// const router = require('express').Router();
const express = require("express");
const app = express(); 
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Sets up the Express app 
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use(express.json());

//api
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server is on Port now ${PORT}!`);
});