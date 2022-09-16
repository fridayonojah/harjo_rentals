const winston = require('winston');
const config = require('config');

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
        new winston.transports.MongoDB({ 
        db: config.get("db"), 
        level: "info",
        options:{
        useUnifiedTopology: true}
    }));
}