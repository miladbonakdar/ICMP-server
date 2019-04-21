const settingStatics = require('../statics/setting_statics');
const SettingRepository = require('../../repositories/settingRepository');
const response = require('../utils/response');
const checkAsync = require('../utils/checkApifunctions').checkAsync;

module.exports = {
    controllerName: 'setting',
    inject: (req, res, next) => {
        req.nodeRepository = new SettingRepository();
        next();
    },

    [settingStatics.update.name]: checkAsync(async (req, res) => {
        let setting = await req.settingRepository.setSetting(req.body);
        response.success(res, setting, 'setting updated successfuly');
    }),

    [settingStatics.delete.name]: checkAsync(async (req, res) => {
        let setting = await req.settingRepository.setDefault();
        response.success(res, setting);
    }),

    [settingStatics.get.name]: checkAsync(async (req, res) => {
        let setting = await req.settingRepository.getSetting();
        response.success(res, setting);
    })
};
