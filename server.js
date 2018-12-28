const app = require("express")();
const api = require("./api");
const cronJobTaskRunner = require("./cron");

global.isDebugMode = true; //for production or debug mode 

api(app);
cronJobTaskRunner.start();
