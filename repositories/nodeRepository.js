const database = require("./db");
const repository = require("./repository");
module.exports = class nodeRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getNodes() {
        const areas = this.db.getData("/areas");
        return _.spread(_.union)(areas.map(item => item.nodes));
        areas.map(area => area.nodes);
    }
};
