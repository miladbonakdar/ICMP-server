const publicStatics = require("../statics/public_statics");
const response = require("../utils/response");
const { check, checkAsync } = require("../utils/checkApifunctions");
const version = require("../../package.json").version;
const pingHosts = require("../../cron/onPingCronJobFinished");
const logRepository = require("../../repositories/logRepository");

module.exports = {
    controllerName: "public",

    /** TODO: add description
     *
     */
    [publicStatics.getExecutationTimes.name]: check((req, res) => {
        let lastLog = new logRepository().getLastLog();
        if (lastLog)
            response.success(
                res,
                {
                    lastExecute: lastLog.createdOn
                },
                "complited successfuly"
            );
        else throw new Error("there is not any log yet");
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
            "complited successfuly"
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
