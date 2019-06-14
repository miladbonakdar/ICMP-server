const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    get: {
        name: 'get',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage)) next();
            else res.accessDenied();
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.pageNumber == null || req.body.pageNumber == undefined) {
                res.badRequest('pageNumber');
                valid = false;
            }
            if (!req.body.pageSize) {
                res.badRequest('pageSize');
                valid = false;
            }
            req.body.pageNumber--;
            if (valid) next();
        }
    }, //get the current log file
    getCsvLog: {
        name: 'getCsvLog',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage, types.export)) next();
            else res.accessDenied();
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.pageNumber == null || req.body.pageNumber == undefined) {
                res.badRequest('pageNumber');
                valid = false;
            }
            if (!req.body.pageSize) {
                res.badRequest('pageSize');
                valid = false;
            }
            if (valid) next();
        }
    }, //get csv file log
    count: {
        name: 'count',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.logPage)) next();
            else res.accessDenied();
        }
    }
};
