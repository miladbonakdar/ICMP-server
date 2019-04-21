//require mongoose module
const mongoose = require('mongoose');
const chalk = require('chalk');
const dbURL = require('../../app.config.js').getMongoConnectionUrl();

var options = {
    useNewUrlParser: true
};

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = function(mongoStarted) {
    mongoose.connect(dbURL, options);
    if (process.env.NODE_ENV != 'production') {
        mongoose.connection.on('connected', function() {
            console.log(connected('Mongoose default connection is open to ', dbURL));
            mongoStarted();
        });

        mongoose.connection.on('error', function(err) {
            console.log(error('Mongoose default connection has occured ' + err + ' error'));
        });

        mongoose.connection.on('disconnected', function() {
            console.log(disconnected('Mongoose default connection is disconnected'));
        });
    }

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination('Mongoose default connection is disconnected due to application termination'));
            throw new Error('Mongoose default connection is disconnected due to application termination');
        });
    });
};
