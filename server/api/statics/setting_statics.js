const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    update: {
        name: 'update',
        method: 'put',
        access: (req, res, next) => {
            if (checker(req.user, types.settingPage)) next();
            else res.accessDenied();
        }
    },
    delete: {
        name: 'delete',
        method: 'delete',
        access: (req, res, next) => {
            if (checker(req.user, types.settingPage)) next();
            else res.accessDenied();
        }
    },
    get: {
        name: 'get',
        method: 'get'
    }
};
