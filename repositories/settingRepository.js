const Setting = require("./mongoModels/setting.model");
module.exports = class SettingRepository {
    async getSetting() {
        try {
            const setting = await Setting.findOne();
            if (setting) return setting;
        } catch (error) {
            console.log(error);
        }
        return await this.setSetting();
    }

    async setSetting(setting = new Setting()) {
        return await setting.save();
    }

    async setDefault() {
        await Setting.remove({});
        return await this.setSetting();
    }
};
