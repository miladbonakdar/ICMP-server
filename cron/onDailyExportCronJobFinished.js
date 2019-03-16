const log = require("../repositories/logRepository");
const csvConverter = require("../utils/csvConverter");
const dailyReportCsvStatics = require("./dailyReportCsvStatics");
/** TODO: add description
 *
 */
module.exports = async () => {
    const logRepository = new log();

    const logs = logRepository.getLogsForCsvExport();
    const csv = new csvConverter(
        logs,
        dailyReportCsvStatics.getHeader(),
        dailyReportCsvStatics.getFilePath()
    );
    csv.convert();
    await csv.saveToFileAsync();
    console.log("csv file created");
};
