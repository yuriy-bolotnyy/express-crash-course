const moment = require('moment')

const logger = (req, res, next) => {
    console.log(`request => ${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    console.log(`response => ${res}`)
    next();
}

module.exports = logger;