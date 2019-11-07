import winston from 'winston';

export default class Logger {
    __winston = winston.createLogger({
        transports: [
            new winston.transports.Console(),
        ]
    });;
    static info(msg) {
        Logger.__winston.info(msg);
    }
    static warn(msg) {
        Logger.__winston.warn(msg);
    }
    static error(msg) {
        Logger.__winston.error(msg);
    }
    static debug(msg) {
        Logger.__winston.debug(msg);
    }
}
Logger.__winston = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
});