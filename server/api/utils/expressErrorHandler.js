const response = require('./response');

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    response.error(res, err.message || err || 'somthing bad happend', 500);
};
