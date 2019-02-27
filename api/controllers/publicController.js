const publicStatics = require("../statics/public_statics");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;
const version = require("../../package.json").version;
const pingHosts = require("../../cron/onPingCronJobFinished").pingHosts;

module.exports = {
    controllerName: "setting",

    /** TODO: add description
     *
     */
    [publicStatics.getExecutationTimes]: check((req, res) => {
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
    [publicStatics.pingNodes]: check((req, res) => {
        pingHosts()
            .then(() => {
                response.success(res);
            })
            .catch(err => {
                throw new Error(err);
            });
    })
};
