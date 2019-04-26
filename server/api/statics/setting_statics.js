const response = require('../utils/response');
const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    update: {
        name: 'update',
        method: 'put',
        access: (req, res, next) => {
            if (checker(req.user, types.settingPage)) next();
            else response.accessDenied(res);
        }
    },
    delete: {
        name: 'delete',
        method: 'delete',
        access: (req, res, next) => {
            if (checker(req.user, types.settingPage)) next();
            else response.accessDenied(res);
        }
    },
    get: {
        name: 'get',
        method: 'get'
    }
};
