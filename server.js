require("./setGlobalVariables")();
const app = require("express")();
const api = require("./api");
const cronJobTaskRunner = require("./cron");
const settingRepository = new (require("./repositories/settingRepository"))();
const redisServer = require("./repositories/redis");

let setting = settingRepository.getSetting();
if (!setting) setting = settingRepository.setSetting();

//set express static files
app.use(express.static(path.join(__dirname, "public")));

api(app);
cronJobTaskRunner.start();
if (setting.isRedisEnabled) redisServer.startRedisClient();
