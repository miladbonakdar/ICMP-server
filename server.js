require("./setGlobalVariables");
require("./utils/foldersInitialiser");
require("./utils/classExtentions")(); //aply extentions
const express = require("express");
const passport = require("./passport");
const api = require("./api");
const SettingRepository = require("./repositories/settingRepository");
const cors = require("cors");
const loginEnabled = require("./app.config").get().loginEnabled;
require("./repositories/db/index")(async () => {
    const app = express();

    app.use(cors());
    // for socket
    const http = require("http").Server(app);
    // const io = require("socket.io")(http);
    // const socket = require("./socket");

    // manage setting for the first time
    const settingRepository = new SettingRepository();
    await settingRepository.getSetting();
    if (loginEnabled) passport();
    // app.use(express.static(path.join(__dirname, "public")));
    // start api
    api(app);
    // // start socket liseners
    // socket(io);
}); //configuration for mongoose
