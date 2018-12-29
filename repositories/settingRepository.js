const database = require("./db");
const settingModel = require("./models/settingModel");
const cron = require("../cron");
const redisClient = require("./redis");
module.exports = class settingRepository {
    constructor(db = database.getSettingDb()) {
        this.db = db;
    }
    getSetting() {
        try {
            let setting = redisClient.get(redisClient.statics.settingObjectKey);
            if (!setting) setting = this.db.getData("/");
            if (Object.keys(setting).length == 0) return this.setSetting();
            return new settingModel(setting);
        } catch (error) {
            console.log(error);
            return this.setSetting();
        }
    }
    updateInRedis(setting) {
        redisClient.set(redisClient.statics.settingObjectKey, setting);
    }
    setSetting(setting) {
        let settingToSave = new settingModel(setting);
        //TODO: we should use event emiter in here to stop services and clients
        // if (!settingToSave.isCsvExportEnabled) cron.stop("csv");
        // if (!settingToSave.isRedisEnabled) redisClient.stopRedisClient();
        this.db.push("/", settingToSave);
        updateInRedis(settingToSave);
        return settingToSave;
    }
};
