const database = require("../db");
const repository = require("./repository");
module.exports = class areaRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getAreas() {}
};
