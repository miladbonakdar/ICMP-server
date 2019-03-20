require("./setGlobalVariables");
require("./utils/foldersInitialiser");
const express = require("express");
const api = require("./api");
const cronJobTaskRunner = require("./cron");
const settingRepository = new (require("./repositories/settingRepository"))();
const redisServer = require("./repositories/redis");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
// for socket
const http = require("http").Server(app);
const io = require("socket.io")(http);
const socket = require("./socket");

// manage setting for the first time
let setting = settingRepository.getSetting();
if (!setting) setting = settingRepository.setSetting();

// set express static files
app.use(express.static(path.join(__dirname, "public")));
// start api
api(app);
// start socket liseners
socket(io);
// start cron jobs
cronJobTaskRunner.start();
// start redis client if avalable and the setting is valid
if (setting.isRedisEnabled) redisServer.startRedisClient();
