require('../setGlobalVariables');
require('../utils/foldersInitialiser');
require('../utils/classExtentions')();

const cronJobTaskRunner = require('./cron');
// start cron jobs
cronJobTaskRunner.start();
console.log('cron job is running now');