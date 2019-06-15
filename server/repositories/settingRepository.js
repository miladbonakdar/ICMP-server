const Setting = require('./mongoModels/setting.model');
let cachedSetting = null;

module.exports = class SettingRepository {
    async getSetting() {
        if (cachedSetting) return cachedSetting;
        try {
            const setting = await Setting.findOne();
            cachedSetting = setting;
            if (setting) return setting;
        } catch (error) {
            console.log(error);
        }
        return await this.setSetting();
    }

    async setSetting(setting = new Setting()) {
        cachedSetting = null;
        return await setting.save();
    }

    async updateSetting(requestBody) {
        await Setting.update({ _id: requestBody.id }, { $set: requestBody }).exec();
        cachedSetting = null;
        return requestBody;
    }

    async setDefault() {
        await Setting.remove({});
        return await this.setSetting();
    }
};
