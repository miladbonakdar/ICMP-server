const bodyParser = require("body-parser");
const routes = require("./routes");
const defaultRoute = require("./utils/defaultRoute");

const onServerStartedSuccessfuly = () => {
    console.log("Server is up and running");
};

const setupMiddlewares = app => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

module.exports = app => {
    setupMiddlewares(app);
    app.listen(process.env.PORT || 3000, onServerStartedSuccessfuly);

    routes(app);
    app.use(defaultRoute);
};
