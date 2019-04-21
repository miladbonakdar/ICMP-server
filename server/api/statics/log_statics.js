module.exports = {
    get: {
        name: 'get',
        method: 'get',
        validate: (req, res, next) => {
            next();
        }
    }, //get the current log file
    getCsvLog: {
        name: 'getCsvLog',
        method: 'get',
        validate: (req, res, next) => {
            next();
        }
    } //get csv file log
};
