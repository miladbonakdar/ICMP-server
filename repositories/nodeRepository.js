const database = require("./db");
const repository = require("./repository");
const NodeModel = require("../models/nodeModel");
const _ = require("lodash");
module.exports = class nodeRepository extends repository {
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
        let nodes = this.redis.get(this.redis.statics.getNodesObjectKey);
        if (nodes) return nodes;
        const areas = this.db.getData("/areas");
        nodes = _.spread(_.union)(areas.map(item => item.nodes));
        this.updateRedis(nodes, this.redis.statics.getNodesObjectKey);
        return nodes;
    }

    /** TODO: add description
     *
     */
    saveNodes(nodes) {
        this.updateRedis(nodes, this.redis.statics.getNodesObjectKey);
    }

    /** TODO: add description
     *
     */
    addNode(requestBody) {
        let newNode = new NodeModel(requestBody);
        let parentArea = this.get(newNode.parent);
        newNode.parent = parentArea.path;
        newNode.path = `${parentArea.path}/nodes[${parentArea.nodes.length +
            1}]`;
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
        if (!nodeToDelete) throw "404 ,the node is not valid to delete";
        this.db.delete(nodeToDelete.path);
        return;
    }

    /** TODO: add description
     *
     */
    getNodeById(id) {
        let baseItem = this.get("/");
        let nodeToReturn;
        baseItem.areas.forEach(area => {
            if (nodeToReturn) return;
            nodeToReturn = area.nodes.filter(node => node.id == id)[0];
        });
        if (!nodeToReturn) throw "404 ,the node was not found";
        return nodeToReturn;
    }

    /** TODO: add description
     *
     */
    getNodeByIndex(index) {
        throw "not implimented method";
    }
};
