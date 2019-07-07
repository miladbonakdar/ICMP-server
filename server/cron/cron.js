const cron = require('node-cron');
const onPingCronJobFinished = require('./onPingCronJobFinished');
const onDailyExportCronJobFinished = require('./onDailyExportCronJobFinished');
const settingRepo = new (require('../repositories/settingRepository'))();

let pingCronJob = undefined;
let setting = undefined;
let csvExportCronJob = undefined;

const stopPingCronJob = () => {
    if (pingCronJob) {
        csvExportCronJob.stop();
        csvExportCronJob = undefined;
    }
};

const stopCsvExportCronJob = () => {
    if (csvExportCronJob) {
        csvExportCronJob.stop();
        csvExportCronJob = undefined;
    }
};

const stopCronJobs = () => {
    stopPingCronJob();
    stopCsvExportCronJob();
};

const startSchadule = async () => {
    try {
        setting = await settingRepo.getSetting();
        startPingCronJob(); //every 30 minutes
        startCsvCronJob(); //every day at 12:00
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const startCsvCronJob = () => {
    if (setting.isCsvExportEnabled && !csvExportCronJob) {
        console.warn('cron job for csv export started');
        csvExportCronJob = cron.schedule(
            `${setting.exportCsvFileAtMinute} ${setting.exportCsvFileAtHour} * * *`,
            onDailyExportCronJobFinished
        );
    }
};

const startPingCronJob = () => {
    if (!pingCronJob) {
        console.warn('cron job for ping started ', setting.pingHostsEvery);
        pingCronJob = cron.schedule(`*/${setting.pingHostsEvery} * * * *`, onPingCronJobFinished);
    }
};

const restart = async () => {
    stopCronJobs();
    await startSchadule();
};

//https://crontab.guru/#15_14_1_*_*
module.exports = {
    start: startSchadule,
    stop: stopCronJobs,
    restart
};
