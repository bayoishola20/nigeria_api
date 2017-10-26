//======================DEPENDENCIES=====================//
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Models
require('./models/state');
require('./models/user');

//Initializing express
const app = express();

//Database connection
mongoose.connect(config.database, { useMongoClient: true });
mongoose.Promise = global.Promise; // This should take care of the mongoose Promise deprecation issue

//On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' +config.database);
});

//No connection
mongoose.connection.on('error', () => {
    console.log('Error in connecting to database ' +config.database);
});


// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/nigeria_api', require('./routes/index'));


// Static folder
app.use(express.static('public'));

//Index or home
let REST_API = "nigeria_api/state".link("nigeria_api/");
app.get('/', (req, res) => {
    res.send(`Oops! Kindly check ${REST_API}`);
});


//for client side files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Port
const port = process.env.PORT || 3000;
// Start Server
app.listen(port, () => {
    console.log('Server started on ' + port);
});