const log = require("../repositories/logRepository");
const csvConverter = require("../utilities/csvConverter");

/** TODO: add description
 *
 */
module.exports = async () => {
    const logRepository = new log();

    const logs = logRepository.getLogs();
    const csv = new csvConverter(logs);
    csv.convert();
    await csv.saveToFileAsync();
};
