const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequlize = require('./util/sequl');


const product = require('./router/Product');
const User=require('./router/User');
const Grade=require('./router/Grade')
const Paper=require('./router/Paper')






app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use('/product',product);
app.use('/User',User);
app.use('/Grade',Grade);
app.use('/Paper/',Paper);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log(error.message);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;