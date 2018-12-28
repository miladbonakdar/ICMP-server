const database = require("./db");
const settingModel = require("./models/settingModel");
const stopCronFunction = require("../cron/index").stopCronJob;
module.exports = class settingRepository {
    constructor(db = database.getSettingDb()) {
        this.db = db;
    }
    getSetting() {
        return new settingModel(this.db.getData("/"));
    }
    setSetting(setting) {
        let settingToSave = new settingModel(setting);
        if (settingToSave.isCsvExportEnabled) stopCronFunction();
        this.db.push("/", settingToSave);
    }
};
