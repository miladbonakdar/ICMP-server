const database = require("../db");
const settingModel = require("./models/settingModel");
module.exports = class settingRepository {
    constructor(db = database.getSettingDb()) {
        this.db = db;
    }
    getSetting() {
        return new settingModel(this.db.getData("/"));
    }
};
