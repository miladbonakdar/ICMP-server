const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    create: {
        name: 'create',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.modifyArea)) next();
            else res.accessDenied();
        }
    },
    update: {
        name: 'update',
        method: 'put',
        access: (req, res, next) => {
            if (checker(req.user, types.modifyArea)) next();
            else res.accessDenied();
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.id) {
                res.badRequest('id');
                valid = false;
            }
            if (valid) next();
        }
    },
    get: {
        name: 'get',
        method: 'get',
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                res.badRequest('id');
                valid = false;
            }
            if (valid) next();
        }
    },
    delete: {
        name: 'delete',
        method: 'delete',
        access: (req, res, next) => {
            if (checker(req.user, types.modifyArea)) next();
            else res.accessDenied();
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                res.badRequest('id');
                valid = false;
            }
            if (valid) next();
        }
    },
    getAll: {
        name: 'getAll',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.dashboardPage)) next();
            else res.accessDenied();
        }
    }
};
