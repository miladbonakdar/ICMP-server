const itemBase = require("./itemBase");
const validator = require("./dataValidator");
module.exports = class area extends itemBase {
    /** TODO: add description
     * 
     */
    constructor(data = null) {
        super(data);
        this.name = validator(data, "name") || null;
        this.nodes = validator(data, "nodes") || [];
    }
};
