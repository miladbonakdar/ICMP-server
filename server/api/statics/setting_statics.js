module.exports = {
    update: {
        name: 'update',
        method: 'put',
        validate: (req, res, next) => {
            if (!accessChecker(req.user, 'sysAdmin')) response.accessDenied(res);
            else next();
        }
    },
    delete: {
        name: 'delete',
        method: 'delete',
        validate: (req, res, next) => {
            if (!accessChecker(req.user, 'sysAdmin')) response.accessDenied(res);
            else next();
        }
    },
    get: {
        name: 'get',
        method: 'get',
        validate: (req, res, next) => {
            next();
        }
    }
};
