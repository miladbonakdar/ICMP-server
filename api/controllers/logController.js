const logStatics = require("../statics/log_statics");
const LogRepository = require("../../repositories/logRepository");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;

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
    })
};
