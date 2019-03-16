const bodyParser = require("body-parser");
const routes = require("./routes");
const defaultRoute = require("./utils/defaultRoute");
const errorHandler = require("./utils/expressErrorHandler");
const appConfig = require("../appConfig.json");

/** TODO: add description
 *
 */
const onServerStartedSuccessfuly = () => {
    console.log(`Server is up and running on port ${appConfig.apiPortNumber}`);
};

/** TODO: add description
 *
 */
const setupMiddlewares = app => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

/** TODO: add description
 *
 */
module.exports = app => {
    setupMiddlewares(app);
    app.listen(appConfig.apiPortNumber, onServerStartedSuccessfuly);
    routes(app);
    app.use(defaultRoute);
    app.use(errorHandler);
};
