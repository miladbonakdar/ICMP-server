const cuid = require("cuid");
const validator = require("./dataValidator");
module.exports = class itemBase {
    /** TODO: add description
     *
     */
    constructor(data = null) {
        this.id = validator(data, "id") || cuid();
        this.parent = validator(data, "parent") || "/";
        this.path = validator(data, "path") || "/";
        this.createdOn = validator(data, "createdOn") || new Date();
        this.areas = validator(data, "areas") || undefined;
        this.logs = validator(data, "logs") || undefined;
    }
};
