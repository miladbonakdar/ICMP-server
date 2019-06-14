const { checker, types } = require('../../utils/userAcessChecker');

module.exports = {
    getSiteInfo: {
        name: 'getSiteInfo',
        method: 'get'
    },
    getExecutationTimes: {
        name: 'getExecutationTimes',
        method: 'get'
    },
    pingNodes: {
        name: 'pingNodes',
        method: 'post',
        access: (req, res, next) => {
            if (checker(req.user, types.ping)) next();
            else res.accessDenied();
        }
    }
};
