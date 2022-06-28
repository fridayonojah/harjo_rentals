const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb').MongoDB;


const logger = createLogger({

    transports:[
        new transports.MongoDB({
            db:'mongodb://localhost/vidly',
            level: 'error',
            collection: 'appErrors',
            options:{
                useUnifiedTopology: true
            } 
        }),

        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});


module.exports = logger;