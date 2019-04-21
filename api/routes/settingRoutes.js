const settingController = require("../controllers/settingController");
const baseUrl = require("../utils/baseRoutController");
const settingStatics = require("../statics/setting_statics");
const middlewareValidator = require("../utils/middlewareValidator");
const passportAuthonticator = require("../utils/passportAuthonticator");

const defaultMiddlewares = middlewareValidator(passportAuthonticator, settingController.inject);

module.exports = router => {
    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.update.method](
            ...defaultMiddlewares,
            ...middlewareValidator(settingStatics.update.validate, settingController[settingStatics.update.name])
        );

    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.delete.method](
            ...defaultMiddlewares,
            ...middlewareValidator(settingStatics.delete.validate, settingController[settingStatics.delete.name])
        );

    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.get.method](
            ...defaultMiddlewares,
            ...middlewareValidator(settingStatics.get.validate, settingController[settingStatics.get.name])
        );
};
