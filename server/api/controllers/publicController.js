const publicStatics = require('../statics/public_statics');
const { checkAsync } = require('../utils/checkApifunctions');
const version = require('../../package.json').version;
const loginEnabled = require('../../app.config').get().loginEnabled;
const pingHosts = require('../../cron/onPingCronJobFinished');
const logRepository = require('../../repositories/logRepository');
const settingRepo = require('../../repositories/settingRepository');

module.exports = {
    controllerName: 'public',
    inject: (req, res, next) => {
        next();
    },

    [publicStatics.getExecutationTimes.name]: checkAsync(async (req, res) => {
        const lastLog = await new logRepository().getLastLog();
        const setting = await new settingRepo().getSetting();
        if (lastLog)
            res.success(
                {
                    lastExecute: lastLog.createdOn,
                    nextExecute: new Date(new Date(lastLog.createdOn).getTime() + setting.pingHostsEvery * 60000)
                },
                'completed successfuly'
            );
        else res.notFound();
    }),

    [publicStatics.getSiteInfo.name]: checkAsync(async (req, res) => {
        res.success(
            {
                siteVersion: version,
                loginEnabled: loginEnabled
            },
            'completed successfuly'
        );
    }),

    [publicStatics.pingNodes.name]: checkAsync(async (req, res) => {
        await pingHosts();
        res.success();
    })
};
