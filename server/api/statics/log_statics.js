const response = require('../utils/response');
const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    get: {
        name: 'get',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage)) next();
            else response.accessDenied(res);
        }
    }, //get the current log file
    getCsvLog: {
        name: 'getCsvLog',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage, types.export)) next();
            else response.accessDenied(res);
        }
    } //get csv file log
};
