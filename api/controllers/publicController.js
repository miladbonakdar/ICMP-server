const publicStatics = require("../statics/public_statics");
const response = require("../utils/response");
const { checkAsync } = require("../utils/checkApifunctions");
const version = require("../../package.json").version;
const pingHosts = require("../../cron/onPingCronJobFinished");
const logRepository = require("../../repositories/logRepository");
const settingRepo = require("../../repositories/settingRepository");

module.exports = {
    controllerName: "public",

    [publicStatics.getExecutationTimes.name]: checkAsync(async (req, res) => {
        const lastLog = await new logRepository().getLastLog();
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

    [publicStatics.getSiteInfo.name]: checkAsync(async (req, res) => {
        response.success(
            res,
            {
                siteVersion: version
            },
            "completed successfuly"
        );
    }),

    [publicStatics.pingNodes.name]: checkAsync(async (req, res) => {
        await pingHosts();
        response.success(res);
    })
};
