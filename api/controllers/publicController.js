const publicStatics = require("../statics/public_statics");
const response = require("../utils/response");
const { check, checkAsync } = require("../utils/checkApifunctions");
const version = require("../../package.json").version;
const pingHosts = require("../../cron/onPingCronJobFinished");
const logRepository = require("../../repositories/logRepository");
const settingRepo = require("../../repositories/settingRepository");

module.exports = {
    controllerName: "public",

    /** TODO: add description
     *
     */
    [publicStatics.getExecutationTimes.name]: check((req, res) => {
        const lastLog = new logRepository().getLastLog();
        const setting = new settingRepo().getSetting();
        if (lastLog)
            response.success(
                res,
                {
                    lastExecute: lastLog.createdOn,
                    nextExecute: new Date(new Date(lastLog.createdOn).getTime() + setting.pingHostsEvery * 60000)
                },
                "completed successfuly"
            );
        else response.notFound(res);
    }),

    /** TODO: add description
     *
     */
    [publicStatics.getSiteInfo.name]: check((req, res) => {
        response.success(
            res,
            {
                siteVersion: version
            },
            "completed successfuly"
        );
    }),

    /** TODO: add description
     *
     */
    [publicStatics.pingNodes.name]: checkAsync(async (req, res) => {
        await pingHosts();
        response.success(res);
    })
};
