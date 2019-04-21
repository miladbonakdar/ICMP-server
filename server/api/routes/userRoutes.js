const userController = require('../controllers/userController');
const baseUrl = require('../utils/baseRoutController');
const userStatics = require('../statics/user_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = middlewareValidator(passportAuthonticator, userController.inject);

module.exports = router => {
    router
        .route(baseUrl(userController.controllerName))
        [userStatics.getAll.method](
            ...defaultMiddlewares,
            ...middlewareValidator(userStatics.getAll.validate, userController[userStatics.getAll.name])
        );

    router
        .route(baseUrl(userController.controllerName))
        [userStatics.create.method](
            ...defaultMiddlewares,
            ...middlewareValidator(userStatics.create.validate, userController[userStatics.create.name])
        );

    router
        .route(baseUrl(userController.controllerName))
        [userStatics.update.method](
            ...defaultMiddlewares,
            ...middlewareValidator(userStatics.update.validate, userController[userStatics.update.name])
        );

    router
        .route(baseUrl(userController.controllerName, undefined, 'id'))
        [userStatics.delete.method](
            ...defaultMiddlewares,
            ...middlewareValidator(userStatics.delete.validate, userController[userStatics.delete.name])
        );

    router
        .route(baseUrl(userController.controllerName, undefined, 'id'))
        [userStatics.get.method](
            ...defaultMiddlewares,
            ...middlewareValidator(userStatics.get.validate, userController[userStatics.get.name])
        );

    router
        .route(baseUrl(userController.controllerName, userStatics.login.name))
        [userStatics.login.method](
            ...middlewareValidator(
                userStatics.get.validate,
                userController.inject,
                userController[userStatics.login.name]
            )
        );
};
