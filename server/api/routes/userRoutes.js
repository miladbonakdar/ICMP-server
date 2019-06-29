const userController = require('../controllers/userController');
const baseUrl = require('../utils/baseRoutController');
const userStatics = require('../statics/user_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = [passportAuthonticator, userController.inject];

module.exports = router => {
    router
        .route(baseUrl(userController.controllerName, userStatics.getUserTypes.name))
        [userStatics.getUserTypes.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                userStatics.getUserTypes.access,
                userStatics.getUserTypes.validate,
                userController[userStatics.getUserTypes.name]
            )
        );

    router
        .route(baseUrl(userController.controllerName))
        [userStatics.getAll.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                userStatics.getAll.access,
                userStatics.getAll.validate,
                userController[userStatics.getAll.name]
            )
        );

    router
        .route(baseUrl(userController.controllerName))
        [userStatics.create.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                userStatics.create.access,
                userStatics.create.validate,
                userController[userStatics.create.name]
            )
        );

    router
        .route(baseUrl(userController.controllerName))
        [userStatics.update.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                userStatics.update.access,
                userStatics.update.validate,
                userController[userStatics.update.name]
            )
        );

    router
        .route(baseUrl(userController.controllerName, undefined, 'id'))
        [userStatics.delete.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                userStatics.delete.access,
                userStatics.delete.validate,
                userController[userStatics.delete.name]
            )
        );

    router
        .route(baseUrl(userController.controllerName, undefined, 'id'))
        [userStatics.get.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                userStatics.get.access,
                userStatics.get.validate,
                userController[userStatics.get.name]
            )
        );

    router
        .route(baseUrl(userController.controllerName, userStatics.login.name))
        [userStatics.login.method](
            ...middlewareValidator(
                userStatics.login.validate,
                userController.inject,
                userController[userStatics.login.name]
            )
        );
};
