const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    get: {
        name: 'get',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage)) next();
            else res.accessDenied();
        }
    }, //get the current log file
    getCsvLog: {
        name: 'getCsvLog',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage, types.export)) next();
            else res.accessDenied();
        }
    } //get csv file log
};
