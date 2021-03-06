const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    create: {
        name: 'create',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage, types.modifyUser)) next();
            else res.accessDenied();
        }
    },
    update: {
        name: 'update',
        method: 'put',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage, types.modifyUser)) next();
            else res.accessDenied();
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.id) {
                res.badRequest('id');
                valid = false;
            }
            if (req.params.id === req.user.id) {
                res.error('you cannot modify yourself', 403);
                valid = false;
            }
            if (valid) next();
        }
    },
    get: {
        name: 'get',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage)) next();
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
    getUserTypes: {
        name: 'getUserTypes',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage)) next();
            else res.accessDenied();
        }
    },
    delete: {
        name: 'delete',
        method: 'delete',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage, types.modifyUser)) next();
            else res.accessDenied();
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                res.badRequest('id');
                valid = false;
            }
            if (req.params.id === req.user.id) {
                res.error('you cannot remove yourself', 403);
                valid = false;
            }
            if (valid) next();
        }
    },
    getAll: {
        name: 'getAll',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage)) next();
            else res.accessDenied();
        }
    },
    login: {
        name: 'login',
        method: 'post',
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.username) {
                res.badRequest('username');
                valid = false;
            }
            if (!req.body.password) {
                res.badRequest('password');
                valid = false;
            }
            if (valid) next();
        }
    }
};
