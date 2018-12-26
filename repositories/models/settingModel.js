const validator = require("./dataValidator");
module.exports = class setting {
    constructor(data = null) {
        this.isRedisEnabled = validator(data, "nodeName") || false;
        this.isLoginEnabled = validator(data, "isLoginEnabled") || false;
    }
};
