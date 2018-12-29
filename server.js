require("./setGlobalVariables")();
const app = require("express")();
const api = require("./api");
const cronJobTaskRunner = require("./cron");
const settingRepo = require("./repositories/settingRepository");
const redisServer = require("./repositories/redis");

const settingRepository = new settingRepo();
let setting = settingRepository.getSetting();
if (!setting) setting = settingRepository.setSetting();

api(app);
cronJobTaskRunner.start();
if (setting.isRedisEnabled) redisServer.startRedisClient();
