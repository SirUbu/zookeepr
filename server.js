// require dependencies
const fs = require('fs');
const path = require('path');
    // express.js for server
const express = require('express');
    // animals object used for json
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// assign the port if present or default
const PORT = process.env.PORT || 3001;

// using express.js, create the server
const app = express();

// middleware start
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make files readily available 
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// middleware end

// run server on local port 3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});