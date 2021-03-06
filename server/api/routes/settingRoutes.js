const settingController = require('../controllers/settingController');
const baseUrl = require('../utils/baseRoutController');
const settingStatics = require('../statics/setting_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = [passportAuthonticator, settingController.inject];

module.exports = router => {
    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.update.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                settingStatics.update.access,
                settingStatics.update.validate,
                settingController[settingStatics.update.name]
            )
        );

    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.delete.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                settingStatics.delete.access,
                settingStatics.delete.validate,
                settingController[settingStatics.delete.name]
            )
        );

    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.get.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                settingStatics.get.access,
                settingStatics.get.validate,
                settingController[settingStatics.get.name]
            )
        );
};
