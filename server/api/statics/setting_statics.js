const accessChecker = require('../../utils/userAcessChecker');
const response = require('../utils/response');

module.exports = {
    update: {
        name: 'update',
        method: 'put'
    },
    delete: {
        name: 'delete',
        method: 'delete'
    },
    get: {
        name: 'get',
        method: 'get'
    }
};
