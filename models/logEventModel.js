const ItemBase = require("./itemBase");
const validator = require("../utils/dataValidator");
module.exports = class LogEvent extends ItemBase {
    /** TODO: add description
     *  FIXME: unitTest
     */
    constructor(data = null) {
        super(data);
        this.totalDown = validator(data, "totalDown") || 0;
        this.totalUp = validator(data, "totalUp") || 0;
        this.totalDevices = validator(data, "totalDevices") || 0;
        this.totalAreas = validator(data, "totalAreas") || 0;
        this.logs = validator(data, "logs") || [];
        if (this.path == "/") throw new Error("the path is not valid");
    }
};
