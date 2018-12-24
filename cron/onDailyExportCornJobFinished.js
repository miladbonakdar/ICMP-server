const areaRepository = require("../repositories/areaRepository");
const logRepository = require("../repositories/logRepository");
const csvConverter = require("../utilities/csvConverter");
const dailyReportCsvStatics = require("../utilities/dailyReportCsvStatics");

module.exports = async () => {
    const areaRepo = new areaRepository();
    const logRepository = new logRepository();
    const areas = areaRepo.getAreas();
    const logs = logRepository.getLogDataFromAreas(areas);
    const csv = new csvConverter(logs);
    csv.convert();
    await csv.saveToFileAsync(dailyReportCsvStatics.getFilePath());
};
