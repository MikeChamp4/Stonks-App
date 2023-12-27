const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Start the app //
const app = express();

//app.use(cors({origin: "http://localhost:4200"}));
app.use(cors());    

// Enviroment Variables //
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

// Middlewares //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine //
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Routes //
app.use(require('./routes/home.routes'));
app.use(require('./routes/login.routes'));

module.exports = app;