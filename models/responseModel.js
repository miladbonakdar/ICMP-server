const validator = require("./dataValidator");
module.exports = class response {
    /** TODO: add description
     *
     */
    constructor(params = null) {
        this.data = validator(params, "data") || {};
        this.success = validator(params, "error") || false;
        this.message = validator(params, "message") || false;
        this.auth = validator(params, "message") || {};
    }
};
