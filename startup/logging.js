const winston = require('winston');
require('winston-mongodb');
module.exports = function () {

    winston.add(
    new winston.transports.File({
        filename:"uncaughtExceptions.log",
        handleExceptions: true
    }));

    //handling an unhandled exceptions 
    process.on('unhandledRejection', (ex) => {
    throw ex;
    });

    winston.add(new winston.transports.File({ filename: "logfile.log"}));
    winston.add(
        new winston.transports.MongoDB({ db: "mongodb://localhost/vidly", 
        level: "info",
        options:{
        useUnifiedTopology: true}
    }));
}