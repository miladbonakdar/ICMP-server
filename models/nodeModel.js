const validator = require("./dataValidator");
const ItemBase = require("./itemBase");
module.exports = class Node extends ItemBase {
    /** TODO: add description
     *
     */
    constructor(data = null) {
        super(data);
        this.name = validator(data, "name",true) || null;
        this.hostName = validator(data, "hostName",true) || null;
        this.ip = validator(data, "hostName") || null;
        this.alive = validator(data, "alive") || false;
    }
};
