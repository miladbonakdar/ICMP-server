const database = require("./db");
const repository = require("./repository");
module.exports = class logRepository extends repository {
    constructor(db = database.getLastLogDb()) {
        super(db);
    }
    saveAreasLog(areas) {
        areas.forEach(area => {});
    }
    getLogs() {
        return this.get("/");
    }
};
