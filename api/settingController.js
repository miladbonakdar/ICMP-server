const settingStatics = require("./statics/setting_statics");
module.exports = {
    controllerName: "setting",
    [settingStatics.update]: (req, res, next) => {
        res.end(settingStatics.update);
    },
    [settingStatics.delete]: (req, res, next) => {
        res.end(settingStatics.delete);
    },
    [settingStatics.get]: (req, res, next) => {
        res.end(settingStatics.get);
    }
};
