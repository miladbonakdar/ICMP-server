const database = require("./db");
const repository = require("./repository");
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
    addNode(requestBody) {}
    /** TODO: add description
     *
     */
    updateNode(requestBody) {}
    /** TODO: add description
     *
     */
    deleteNode(id) {}
    /** TODO: add description
     *
     */
    getNodeById(id) {}
    /** TODO: add description
     *
     */
    getNodeByIndex(index) {}
};
