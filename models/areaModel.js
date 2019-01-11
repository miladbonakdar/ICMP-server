const ItemBase = require("./itemBase");
const validator = require("./dataValidator");
module.exports = class Area extends ItemBase {
    /** TODO: add description
     *  FIXME: unitTest
     */
    constructor(data = null) {
        super(data);
        this.name = validator(data, "name", true) || null;
        this.nodes = validator(data, "nodes") || [];
        if (this.path == "/") throw new Error("the path is not valid");
    }
};
