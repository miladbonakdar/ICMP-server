const database = require("./db");
const settingModel = require("./models/settingModel");
const stopCronFunction = require("../cron/index").stopCronJob;
const stopRedisClientFunction = require("./redis").stopRedisClient;
module.exports = class settingRepository {
    constructor(db = database.getSettingDb()) {
        this.db = db;
    }
    getSetting() {
        try {
            setting = this.db.getData("/");
            return new settingModel(setting);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    setSetting(setting) {
        let settingToSave = new settingModel(setting);
        if (!settingToSave.isCsvExportEnabled) stopCronFunction();
        if (!settingToSave.isRedisEnabled) stopRedisClientFunction();
        this.db.push("/", settingToSave);
        return settingToSave;
    }
};
