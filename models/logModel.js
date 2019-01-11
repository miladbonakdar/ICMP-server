const validator = require("./dataValidator");
const ItemBase = require("./itemBase");
module.exports = class Node extends ItemBase {
    /** TODO: add description
     *
     */
    constructor(data = null) {
        super(data);
        this.nodeName = validator(data, "nodeName") || null;
        this.date = validator(data, "date") || new Date();
        this.ip = validator(data, "ip") || null;
        this.areaName = validator(data, "areaName") || null;
        this.areaId = validator(data, "areaId") || null;
        this.nodeId = validator(data, "nodeId") || null;
        this.nodePath = validator(data, "nodePath") || null;
        this.isAlive = validator(data, "isAlive") || false;
        if (this.path == "/") throw new Error("the path is not valid");
    }

    /** TODO: add description
     *
     */
    getCsvString() {
        return `${this.date},${this.date},${this.areaName},${this.nodeName},${
            this.nodeName
        },${this.nodeName},${this.nodeName}`;
    }
};
