const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
var keys = require('./config/keys');
require('./models/account');
require('./models/store');
require('./models/product');
require('./models/cart');
require('./models/transaction');
require('./services/mongoService');
require('./services/passport');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    dbName : 'capgemini'
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(new cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/assets', express.static(path.join(__dirname, 'assets')))
require('./routes/index')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);