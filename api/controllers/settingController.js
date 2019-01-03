const settingStatics = require("../statics/setting_statics");
const SettingRepository = require("../../repositories/settingRepository");
const response = require("../utils/response");
module.exports = {
    controllerName: "setting",
    
    [settingStatics.update]: (req, res) => {
        try {
            const settingRepo = new SettingRepository();
            let setting = settingRepo.setSetting(req.body);
            response.success(res, setting, "setting updated successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [settingStatics.delete]: (req, res) => {
        try {
            const settingRepo = new SettingRepository();
            let setting = settingRepo.setDefault();
            response.success(res, setting);
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [settingStatics.get]: (req, res) => {
        try {
            const settingRepo = new SettingRepository();
            let setting = settingRepo.getSetting();
            response.success(res, setting);
        } catch (e) {
            response.internalServerError(res, e);
        }
    }
};
