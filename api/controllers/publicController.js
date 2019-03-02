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
    [publicStatics.getExecutationTimes]: check((req, res) => {
        logRepo = new logRepository();
        response.success(
            res,
            {
                lastExecute: new Date(),
                nextExecute: new Date()
            },
            "complited successfuly"
        );
    }),

    /** TODO: add description
     *
     */
    [publicStatics.getSiteInfo]: check((req, res) => {
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
    [publicStatics.pingNodes]: checkAsync(async (req, res) => {
        await pingHosts();
        response.success(res);
    })
};
