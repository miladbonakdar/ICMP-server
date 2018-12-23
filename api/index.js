const routes = require("./routes");
const defaultRoute = require('./utils/defaultRoute')
module.exports = app => {
    routes(app);
    app.use(defaultRoute);
};
