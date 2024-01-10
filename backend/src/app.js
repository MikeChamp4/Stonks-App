const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

// Start the app //
const app = express();

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
};

app.use(cors(corsOptions));  

// Enviroment Variables //
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

// Middlewares //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// View Engine //
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Routes //
app.use(require('./routes/home.routes'));
app.use(require('./routes/login.routes'));
app.use(require('./routes/user.routes'));

module.exports = app;