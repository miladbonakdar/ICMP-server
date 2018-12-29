const app = require("express")();
const api = require("./api");
const cronJobTaskRunner = require("./cron");
const settingRepo = new (require("./repositories/settingRepository"))();
const redisServer = require("./repositories/redis");

let setting = settingRepo.getSetting();
if (!setting) setting = settingRepo.setSetting();

global.isDebugMode = true; //for production or debug mode

api(app);
cronJobTaskRunner.start();
if (setting.isRedisEnabled) redisServer.startRedisClient();
