const database = require("./db");
const repository = require("./repository");
module.exports = class logRepository extends repository {
    /** TODO: add description
     *
     */
    constructor(db = database.getLastLogDb()) {
        super(db);
    }
    /** TODO: add description
     *
     */
    saveAreasLog(areas) {
        // areas.forEach(area => {});
    }
    /** TODO: add description
     *
     */
    getLogs() {
        return this.get("/");
    }
};
