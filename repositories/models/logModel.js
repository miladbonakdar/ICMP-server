const itemBase = require("./itemBase");
module.exports = class node extends itemBase {
    constructor(data = null) {
        super(data);
        if (data) {
            this.nodeName = data.nodeName || null;
            this.date = data.date || new Date();
            this.ip = data.ip || "localhost";
            this.areaName = data.areaName || null;
            this.areaId = data.areaId || null;
            this.nodeId = data.nodeId || null;
            this.nodePath = data.nodePath || null;
            this.isAlive = data.isAlive || false;
        } else {
            this.nodeName =  null;
            this.date = new Date();
            this.ip = "localhost";
            this.areaName = null;
            this.areaId = null;
            this.nodeId = null;
            this.nodePath = null;
            this.isAlive = false;
        }
    }

    getCsvString = () => {
        return `${this.date},${this.date},${this.areaName},${this.nodeName},${this.nodeName},${this.nodeName},${this.nodeName}`
    };
};
