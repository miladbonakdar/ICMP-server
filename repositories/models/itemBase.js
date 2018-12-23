const cuid = require("cuid");

module.exports = class itemBase {
    constructor(data = null) {
        if (data) {
            this.id = data.id || cuid();
            this.parent = data.parent || undefined;
            this.path = data.path || "/";
            this.createdOn = data.createdOn || new Date();
        } else {
            this.id = cuid();
            this.parent = undefined;
            this.path = "/";
            this.createdOn = new Date();
        }
    }
};
