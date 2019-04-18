const validator = require("../utils/dataValidator");
const ItemBase = require("./itemBase");
class Node extends ItemBase {
    /** TODO: add description
     *  FIXME: unitTest
     */
    constructor(data = null) {
        super(data);
        this.name = validator(data, "name", true) || null;
        this.hostName = validator(data, "hostName", true) || null;
        this.alive = validator(data, "alive") || false;
        if (this.path == "/") throw new Error("the path is not valid");
    }
}

Node.prototype.csvExportHeader = {
    id: "Id",
    parent: "Parent path",
    path: "Node path",
    createdOn: "Created on",
    updatedOn: "Updated on",
    name: "Node name",
    hostName: "Ip",
    alive: "Alive"
};

module.exports = Node;
