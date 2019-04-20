const logStatics = require("../statics/log_statics");
const LogRepository = require("../../repositories/logRepository");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;
const dailyReportCsvStatics = require("../../cron/dailyReportCsvStatics");
const csvConverter = require("../../utils/csvConverter");

module.exports = {
    controllerName: "log",

    [logStatics.get.name]: check((req, res) => {
        const logRepo = new LogRepository();
        const logEvents = logRepo.getLogEvents(req.params.date);
        response.success(res, logEvents);
    }),

    [logStatics.getCsvLog.name]: check((req, res) => {
        const logRepo = new LogRepository();
        const logs = logRepo.getLogsForCsvExport(req.params.date);
        const date = new Date();
        response.exportCsv(
            res,
            `logs Export - ${date.getNowFileName()}`,
            new csvConverter(logs, dailyReportCsvStatics.getHeader()).convert()
        );
    })
};
