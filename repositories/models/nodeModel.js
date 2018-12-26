const validator = require("./dataValidator");
const itemBase = require("./itemBase");
module.exports = class node extends itemBase {
    constructor(data = null) {
        super(data);
        this.name = validator(data, "name") || null;
        this.hostName = validator(data, "hostName") || null;
        this.ip = validator(data, "hostName") || null;
        this.areaId = validator(data, "areaId") || null;
        this.alive = validator(data, "alive") || false;
    }
};
