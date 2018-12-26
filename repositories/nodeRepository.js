const database = require("../db");
const repository = require("./repository");
module.exports = class nodeRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getNodes() {
        let areas = this.db.getData("/areas");
        // TODO need loadash or underscore here
        areas.map(area => area.nodes);
    }
};
