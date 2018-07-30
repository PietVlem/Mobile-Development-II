/* Libraries */
const http = require('http');
var express = require('express');
const path = require('path');
const logger = require('morgan');
var app = express();
const server = http.Server(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

/* Settings */
const hostname = '127.0.0.1';
const port = 8080;
const nodeEnv = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
if (nodeEnv !== 'production') {
    console.log('Do some development automation!');
}

/* Mongoose (MongoDb-port) */
const mongoDbConnectionString = 'mongodb://mobdev2:wickedman@ds111319.mlab.com:11319/mobdev2';
mongoose.connect(mongoDbConnectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb Cconnection error!'));


/* Cors */
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/* Custom Routes */
const routes = require('./config/routes');

/* Express.js settings */
app.use(express.static(path.join(__dirname, './web_app/build')));
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', routes);
app.use((req, res, next) => {
    const err = new Error('404 - Hello is it me you are looking for?');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

console.log(process.env.NODE_ENV);

/* Launch server */
server.listen(port, hostname, () => {
    console.log(`Node.js server running at http://${hostname}:${port}/`);
});

