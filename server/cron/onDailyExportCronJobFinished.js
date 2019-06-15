const log = require('../repositories/logRepository');
const csvConverter = require('../utils/csvConverter');
const dailyReportCsvStatics = require('./dailyReportCsvStatics');

module.exports = async () => {
    const logRepository = new log();
    const logs = logRepository.getLogsForCsvExport();
    const csv = new csvConverter(
        logs,
        logRepository.getLogHeader(),
        dailyReportCsvStatics.getFilePath()
    );
    csv.convert();
    await csv.saveToFileAsync();
    console.log('csv file created');
};
