const response = require('../utils/response');
const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    create: {
        name: 'create',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.modifyNode)) next();
            else response.accessDenied(res);
        }
    },
    update: {
        name: 'update',
        method: 'put',
        access: (req, res, next) => {
            if (checker(req.user, types.modifyNode)) next();
            else response.accessDenied(res);
        },
        validate: (req, res, next) => {
            let valid = true;
            if (!req.body.id) {
                response.badRequest(res, 'id');
                valid = false;
            }
            if (!req.body.areaId) {
                response.badRequest(res, 'areaId');
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
        access: (req, res, next) => {
            if (checker(req.user, types.modifyNode)) next();
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
        method: 'get'
    },
    exportCsv: {
        name: 'export',
        method: 'get',
        access: (req, res, next) => {
            if (checker(req.user, types.export)) next();
            else response.accessDenied(res);
        }
    }
};
