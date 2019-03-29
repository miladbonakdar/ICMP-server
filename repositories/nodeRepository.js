const database = require("./db");
const Repository = require("./repository");
const NodeModel = require("../models/nodeModel");
const _ = require("lodash");
module.exports = class NodeRepository extends Repository {
    /** TODO: add description
     *
     */
    constructor(db = database.getMainDb()) {
        super(db);
    }

    /** TODO: add description
     *
     */
    getNodes() {
        const areas = this.db.getData("/areas");
        nodes = _.spread(_.union)(areas.map(item => item.nodes));
        return nodes;
    }

    /** TODO: add description
     *
     */
    addNode(requestBody) {
        let parentArea = this.get(requestBody.parent);
        requestBody.path = `${parentArea.path}/nodes[${parentArea.nodes.length}]`;
        let newNode = new NodeModel(requestBody);
        newNode.parent = parentArea.path;
        this.add(newNode);
        return newNode;
    }

    /** TODO: add description
     *
     */
    updateNode(requestBody) {
        let newNode = new NodeModel(requestBody);
        this.get(newNode.path); //just to check if it is valid
        this.add(newNode);
        return newNode;
    }

    /** TODO: add description
     *
     */
    deleteNode(id) {
        let baseItem = this.get("/");
        let nodeToDelete;
        baseItem.areas.forEach(area => {
            if (nodeToDelete) return;
            nodeToDelete = area.nodes.filter(node => node.id == id)[0];
        });
        if (!nodeToDelete) throw new Error("404 ,the node is not valid to delete");
        this.db.delete(nodeToDelete.path);
        this.updateAllNodesPath(nodeToDelete.parent);
        return;
    }

    updateAllNodesPath(parent) {
        let area = this.get(parent);
        if (!area.nodes) return;
        for (let i = 0; i < area.nodes.length; i++) {
            const newPath = `${parent}/nodes[${i}]`;
            area.nodes[i].path = newPath;
        }
        this.db.push(parent, area);
    }

    /** TODO: add description
     *
     */
    getNodeById(id) {
        let baseItem = this.get("/");
        let nodeToReturn;
        for (const area of baseItem.areas) {
            nodeToReturn = area.nodes.filter(node => node.id == id)[0];
            if (nodeToReturn) break;
        }
        if (!nodeToReturn) throw new Error("404 ,the node was not found");
        return nodeToReturn;
    }

    /** TODO: add description
     *
     */
    getNodeByIndex(index) {
        throw new Error("not implimented method");
    }
};
