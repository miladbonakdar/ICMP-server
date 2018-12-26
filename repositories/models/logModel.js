const validator = require("./dataValidator");
const itemBase = require("./itemBase");
module.exports = class node extends itemBase {
    constructor(data = null) {
        super(data);
        this.nodeName = validator(data, "nodeName") || null;
        this.date = validator(data, "date") || new Date();
        this.ip = validator(data, "ip") || "localhost";
        this.areaName = validator(data, "areaName") || null;
        this.areaId = validator(data, "areaId") || null;
        this.nodeId = validator(data, "nodeId") || null;
        this.nodePath = validator(data, "nodePath") || null;
        this.isAlive = validator(data, "isAlive") || false;
    }

    getCsvString() {
        return `${this.date},${this.date},${this.areaName},${this.nodeName},${
            this.nodeName
        },${this.nodeName},${this.nodeName}`;
    }
};
