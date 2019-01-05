const cron = require("node-cron");
const onPingCronJobFinished = require("./onPingCronJobFinished");
const onDailyExportCronJobFinished = require("./onDailyExportCronJobFinished");
const settingRepo = new (require("../repositories/settingRepository"))();

let pingCronJob = undefined;
let setting = undefined;
let csvExportCronJob = undefined;

/** TODO: add description
 *
 */
const stopCronJob = cronName => {
    if (cronName.indexOf("csv") >= 0 && csvExportCronJob) {
        csvExportCronJob.stop();
        csvExportCronJob = undefined;
    }
};

/** TODO: add description
 *
 */
const startSchadule = () => {
    setting = settingRepo.getSetting();
    startPingCronJob(); //every 30 minutes
    startCsvCronJob(); //every day at 12:00
};

/** TODO: add description
 *
 */
const startCsvCronJob = () => {
    if (setting.isCsvExportEnabled && !csvExportCronJob)
        csvExportCronJob = cron.schedule(
            `${setting.exportCsvFileAtMinute} ${
                setting.exportCsvFileAtHour
            } * * *`,
            onDailyExportCronJobFinished
        );
};

/** TODO: add description
 *
 */
const startPingCronJob = () => {
    if (!pingCronJob)
        pingCronJob = cron.schedule(
            `*/${setting.pingHostsEvery} * * * *`,
            onPingCronJobFinished
        );
};

//https://crontab.guru/#15_14_1_*_*
module.exports = {
    start: startSchadule,
    stop: stopCronJob
};
