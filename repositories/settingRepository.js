const database = require("./db");
const settingModel = require("../models/settingModel");

module.exports = class SettingRepository {
    /** TODO: add description
     *
     */
    constructor(db = database.getSettingDb()) {
        this.db = db;
    }

    /** TODO: add description
     *
     */
    getSetting() {
        try {
            let setting = this.db.getData("/");
            if (Object.keys(setting).length == 0) return this.setSetting();
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
        this.db.push("/", settingToSave);
        return settingToSave;
    }

    /** TODO: add description
     *
     */
    setDefault() {
        return this.setSetting(new settingModel());
    }
};
