require('../setGlobalVariables');
require('../utils/classExtentions')();

require('dotenv').config({ path: '../.env' });

require('../repositories/db/index')(async () => {
    const cronJobTaskRunner = require('./cron');
    // start cron jobs
    cronJobTaskRunner.start();
    console.log('cron job is running now');
});
