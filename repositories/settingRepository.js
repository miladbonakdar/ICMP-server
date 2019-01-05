const database = require("./db");
const settingModel = require("../models/settingModel");
const redisClient = require("./redis");

module.exports = class settingRepository {
    /** TODO: add description
     *
     */
    constructor(db = database.getSettingDb()) {
        this.db = db;
    }
    /** TODO: add description
     *
     */
    updateInRedis(setting) {
        redisClient.set(redisClient.statics.settingObjectKey, setting);
    }
    /** TODO: add description
     *
     */
    getSetting() {
        try {
            let setting = redisClient.get(redisClient.statics.settingObjectKey);
            if (!setting) setting = this.db.getData("/");
            if (Object.keys(setting).length == 0) return this.setSetting();
            this.updateInRedis(setting);
            return new settingModel(setting);
        } catch (error) {
            console.log(error);
            return this.setSetting();
        }
    }
    /** TODO: add description
     *
     */
    setSetting(setting) {
        let settingToSave = new settingModel(setting);
        //TODO: we should use event emiter in here to stop services and clients
        // if (!settingToSave.isCsvExportEnabled) cron.stop("csv");
        // if (!settingToSave.isRedisEnabled) redisClient.stopRedisClient();
        this.db.push("/", settingToSave);
        this.updateInRedis(settingToSave);
        return settingToSave;
    }
    /** TODO: add description
     *
     */
    setDefault() {
        return this.setSetting(new settingModel());
    }
};
