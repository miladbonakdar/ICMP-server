const cron = require("node-cron");
const onPingCornJobFinished = require("./onPingCornJobFinished");
const onDailyExportCornJobFinished = require("./onDailyExportCornJobFinished");
//https://crontab.guru/#15_14_1_*_*
module.exports = () => {
    cron.schedule("*/30 * * * *", onPingCornJobFinished);//every 30 minutes
    cron.schedule("50 23 * * *", onDailyExportCornJobFinished);//every day at 12:00
};
