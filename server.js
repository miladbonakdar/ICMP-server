require("./setGlobalVariables");
require("./utils/foldersInitialiser");
require("./utils/classExtentions")(); //aply extentions
const express = require("express");
const api = require("./api");
const SettingRepository = require("./repositories/settingRepository");
const path = require("path");
const cors = require("cors");
require("./repositories/db/index")( async () => {
    const app = express();

    app.use(cors());
    // for socket
    const http = require("http").Server(app);
    // const io = require("socket.io")(http);
    // const socket = require("./socket");

    // manage setting for the first time
    // const settingRepository = new SettingRepository();
    // await settingRepository.getSetting();

    // set express static files
    app.use(express.static(path.join(__dirname, "public")));
    // start api
    api(app);
    // // start socket liseners
    // socket(io);
}); //configuration for mongoose
