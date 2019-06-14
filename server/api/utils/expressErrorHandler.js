module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.error(err.message || err || 'somthing bad happend', 500);
};
