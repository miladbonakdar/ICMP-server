const response = require('../utils/response');
const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    create: {
        name: 'create',
        method: 'post'
    },
    update: {
        name: 'update',
        method: 'put',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage, types.modifyUser)) next();
            else response.accessDenied(res);
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.id) {
                response.badRequest(res, 'id');
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
            else response.accessDenied(res);
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                response.badRequest(res, 'id');
                valid = false;
            }
            if (valid) next();
        }
    },
    delete: {
        name: 'delete',
        method: 'delete',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage, types.modifyUser)) next();
            else response.accessDenied(res);
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                response.badRequest(res, 'id');
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
            else response.accessDenied(res);
        }
    },
    login: {
        name: 'login',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.userPage, types.modifyUser)) next();
            else response.accessDenied(res);
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.username) {
                response.badRequest(res, 'username');
                valid = false;
            }
            if (!req.body.password) {
                response.badRequest(res, 'password');
                valid = false;
            }
            if (valid) next();
        }
    }
};
