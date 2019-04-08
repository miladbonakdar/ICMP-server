require("../utils/setGlobalVariables");
require("../utils/foldersInitialiser");
require("../utils/classExtentions")();

const cronJobTaskRunner = require("./cron");
// start cron jobs
cronJobTaskRunner.start();