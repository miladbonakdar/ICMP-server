const app = require("express")();
const api = require("./api");
const cronJobTaskRunner = require("./cron");

global.isDebugMode = true; //for production or debug mode 
global.__basedir = __dirname;

api(app);
cronJobTaskRunner();
