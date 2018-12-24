const database = require("../db");
const repository = require("./repository");
module.exports = class nodeRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getNodes = () => {};
};
