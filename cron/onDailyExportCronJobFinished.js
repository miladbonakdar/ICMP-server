const logRepository = require("../repositories/logRepository");
const csvConverter = require("../utilities/csvConverter");
const dailyReportCsvStatics = require("../utilities/dailyReportCsvStatics");

module.exports = async () => {
    const logRepository = new logRepository();

    const logs = logRepository.getLogsForCsvExport();
    const csv = new csvConverter(logs);
    csv.convert();
    await csv.saveToFileAsync();
};
