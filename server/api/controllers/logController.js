const logStatics = require('../statics/log_statics');
const LogRepository = require('../../repositories/logRepository');
const checkAsync = require('../utils/checkApifunctions').checkAsync;
const dailyReportCsvStatics = require('../../cron/dailyReportCsvStatics');
const csvConverter = require('../../utils/csvConverter');

module.exports = {
    controllerName: 'log',
    inject: (req, res, next) => {
        req.logRepository = new LogRepository();
        next();
    },

    [logStatics.get.name]: checkAsync(async (req, res) => {
        const logEvents = await req.logRepository.getLogEvents(req.body);
        res.success(logEvents);
    }),

    [logStatics.count.name]: checkAsync(async (req, res) => {
        const count = await req.logRepository.getLogsCount();
        res.success(count);
    }),

    [logStatics.getCsvLog.name]: checkAsync(async (req, res) => {
        const logs = await req.logRepository.getLogsForCsvExport(req.body);
        const date = new Date();
        res.exportCsv(
            `logs Export - ${date.getNowFileName()}`,
            new csvConverter(logs, dailyReportCsvStatics.getHeader()).convert()
        );
    })
};
