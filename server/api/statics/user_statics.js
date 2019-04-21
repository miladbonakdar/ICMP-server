const response = require('../utils/response');

module.exports = {
    create: {
        name: 'create',
        method: 'post',
        validate: (req, res, next) => {
            if (!accessChecker(req.user, 'sysAdmin')) response.accessDenied(res);
            else next();
        }
    },
    update: {
        name: 'update',
        method: 'put',
        validate: (req, res, next) => {
            let valid = true;
            if (!accessChecker(req.user, 'sysAdmin')) {
                response.accessDenied(res);
                valid = false;
            }
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
        validate: (req, res, next) => {
            let valid = true;
            if (!accessChecker(req.user, 'sysAdmin')) {
                response.accessDenied(res);
                valid = false;
            }
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
        validate: (req, res, next) => {
            if (!accessChecker(req.user, 'allAdmin')) response.accessDenied(res);
            else next();
        }
    },
    login: {
        name: 'login',
        method: 'post',
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
