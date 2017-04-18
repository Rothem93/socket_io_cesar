//  file: ./logger/logger.js

var winston = require('winston');
var path = require('path');

winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.DailyRotateFile({
            level: 'error',
            name: 'file',
            datePattern: '.yyyy-MM-dd',
            filename: path.join("./", "log_file.log"),
            handleExceptions: true,
            json: true
        })
    ],
    exitOnError: true
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};