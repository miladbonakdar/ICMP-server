const validator = require('../utils/dataValidator');
module.exports = class Response {
    constructor(params = null) {
        this.data = validator(params, 'data') || {};
        this.success = validator(params, 'success') || false;
        this.message = validator(params, 'message') || false;
        this.auth = validator(params, 'auth') || {};
    }
};
