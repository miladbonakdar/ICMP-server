const bodyParser = require("body-parser");
const routes = require("./routes");
const defaultRoute = require("./utils/defaultRoute");

/** TODO: add description
 *
 */
const onServerStartedSuccessfuly = () => {
    console.log("Server is up and running");
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
    app.listen(process.env.PORT || 3000, onServerStartedSuccessfuly);

    routes(app);
    app.use(defaultRoute);
};
