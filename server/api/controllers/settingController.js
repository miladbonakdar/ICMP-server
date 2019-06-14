const settingStatics = require('../statics/setting_statics');
const SettingRepository = require('../../repositories/settingRepository');
const checkAsync = require('../utils/checkApifunctions').checkAsync;

module.exports = {
    controllerName: 'setting',
    inject: (req, res, next) => {
        req.settingRepository = new SettingRepository();
        next();
    },

    [settingStatics.update.name]: checkAsync(async (req, res) => {
        let setting = await req.settingRepository.setSetting(req.body);
        res.success(setting, 'setting updated successfuly');
    }),

    [settingStatics.delete.name]: checkAsync(async (req, res) => {
        let setting = await req.settingRepository.setDefault();
        res.success(setting);
    }),

    [settingStatics.get.name]: checkAsync(async (req, res) => {
        let setting = await req.settingRepository.getSetting();
        res.success(setting);
    })
};
