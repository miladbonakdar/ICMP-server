const cuid = require("cuid");
const validator = require("./dataValidator");
module.exports = class itemBase {
    constructor(data = null) {
        this.id = validator(data, "id") || cuid();
        this.parent = validator(data, "parent") || undefined;
        this.path = validator(data, "path") || "/";
        this.createdOn = validator(data, "createdOn") || new Date();
        this.areas = validator(data, "areas") || undefined;
    }
};
