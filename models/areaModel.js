const ItemBase = require("./itemBase");
const validator = require("./dataValidator");
module.exports = class Area extends ItemBase {
    /** TODO: add description
     *  FIXME: unitTest
     */
    constructor(data = null) {
        super(data);
        this.name = validator(data, "name", true);
        this.totalDwon = validator(data, "totalDwon") || 0;
        this.totalUp = validator(data, "totalUp") || 0;
        this.nodes = validator(data, "nodes") || [];
        if (this.path == "/") throw new Error("the path is not valid");
    }
};
