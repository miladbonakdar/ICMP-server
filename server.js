const app = require("express")();
const bodyParser = require("body-parser");
const api = require("./api");
const cronJobTaskRunner = require("./cron");

global.isDebugMode = true; //for production or debug mode 

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

api(app);
cronJobTaskRunner();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
