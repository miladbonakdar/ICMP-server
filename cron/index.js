const cron = require("node-cron");
const onPingCornJobFinished = require("./onPingCornJobFinished");
const onDailyExportCornJobFinished = require("./onDailyExportCornJobFinished");
const settingRepo = require("../repositories/settingRepository");
const setting = new settingRepo().getSetting();

let pingCronJob = undefined;
let csvExportCronJob = undefined;

const stopCronJob = cronName => {
    if (cronName.indexOf("csv") >= 0 && csvExportCronJob) {
        csvExportCronJob.stop();
        csvExportCronJob = undefined;
    }
};

const startSchadule = () => {
    startPingCronJob(); //every 30 minutes
    startCsvCronJob(); //every day at 12:00
};

const startCsvCronJob = () => {
    if (setting.isCsvExportEnabled && !csvExportCronJob)
        csvExportCronJob = cron.schedule(
            `${setting.exportCsvFileAtMinute} ${
                setting.exportCsvFileAtHour
            } * * *`,
            onDailyExportCornJobFinished
        );
};

const startPingCronJob = () => {
    if (!pingCronJob)
        pingCronJob = cron.schedule(
            `*/${setting.pingHostsEvery} * * * *`,
            onPingCornJobFinished
        );
};

//https://crontab.guru/#15_14_1_*_*
module.exports = {
    start: startSchadule,
    stopCronJob: stopCronJob
};
