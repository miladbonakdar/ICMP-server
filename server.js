require("./utils/setGlobalVariables");
require("./utils/foldersInitialiser");
require("./utils/classExtentions")();
const express = require("express");
const api = require("./api");
const settingRepository = new (require("./repositories/settingRepository"))();
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
// for socket
const http = require("http").Server(app);
// const io = require("socket.io")(http);
// const socket = require("./socket");

// manage setting for the first time
let setting = settingRepository.getSetting();
if (!setting) setting = settingRepository.setSetting();

// set express static files
app.use(express.static(path.join(__dirname, "public")));
// start api
api(app);
// // start socket liseners
// socket(io);
