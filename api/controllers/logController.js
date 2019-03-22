const logStatics = require("../statics/log_statics");
const LogRepository = require("../../repositories/logRepository");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;
const dailyReportCsvStatics = require("../../cron/dailyReportCsvStatics");
const csvConverter = require("../../utils/csvConverter");

module.exports = {
    controllerName: "log",

    /** TODO: add description
     *
     */

    [logStatics.get.name]: check((req, res) => {
        const logRepo = new LogRepository();
        const logEvents = logRepo.getLogEvents(req.params.date);
        response.success(res, logEvents);
    }),

    /** TODO: add description
     *
     */
    [logStatics.getLog.name]: check((req, res) => {
        const logRepo = new LogRepository();
        const log = logRepo.getLog(req.params.date, req.params.id);
        response.success(res, log);
    }),

    /** TODO: add description
     *
     */
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
