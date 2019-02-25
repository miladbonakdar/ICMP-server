const settingStatics = require("../statics/setting_statics");
const SettingRepository = require("../../repositories/settingRepository");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;

module.exports = {
    controllerName: "setting",

    /** TODO: add description
     *
     */
    [settingStatics.update]: check((req, res) => {
        const settingRepo = new SettingRepository();
        let setting = settingRepo.setSetting(req.body);
        response.success(res, setting, "setting updated successfuly");
    }),

    /** TODO: add description
     *
     */
    [settingStatics.delete]: check((req, res) => {
        const settingRepo = new SettingRepository();
        let setting = settingRepo.setDefault();
        response.success(res, setting);
    }),

    /** TODO: add description
     *
     */
    [settingStatics.get]: check((req, res) => {
        const settingRepo = new SettingRepository();
        let setting = settingRepo.getSetting();
        response.success(res, setting);
    })
};
