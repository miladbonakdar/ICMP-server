module.exports = {
    getSiteInfo: {
        name: 'getSiteInfo',
        method: 'get',
        validate: (req, res, next) => {
            next();
        }
    },
    getExecutationTimes: {
        name: 'getExecutationTimes',
        method: 'get',
        validate: (req, res, next) => {
            next();
        }
    },
    pingNodes: {
        name: 'pingNodes',
        access: 'allAdmin',
        method: 'post',
        validate: (req, res, next) => {
            next();
        }
    }
};
