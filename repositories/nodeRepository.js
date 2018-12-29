const database = require("./db");
const repository = require("./repository");
module.exports = class nodeRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getNodes() {
        let nodes = this.redis.get(this.redis.statics.getNodesObjectKey);
        if (nodes) return nodes;
        const areas = this.db.getData("/areas");
        nodes = _.spread(_.union)(areas.map(item => item.nodes));
        this.updateRedis(nodes, this.redis.statics.getNodesObjectKey);
        return nodes;
    }
    saveNodes(nodes) {
        this.updateRedis(nodes, this.redis.statics.getNodesObjectKey);
    }
};
