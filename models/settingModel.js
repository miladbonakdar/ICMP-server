const validator = require("./dataValidator");
module.exports = class setting {
    /** TODO: add description
     *
     */
    constructor(data = null) {
        this.isRedisEnabled = validator(data, "isRedisEnabled") || false;
        this.isLoginEnabled = validator(data, "isLoginEnabled") || false;
        this.isCsvExportEnabled =
            validator(data, "isCsvExportEnabled") || false;
        this.exportCsvFileAtHour = validator(data, "exportCsvFileAtHour") || 23;
        this.exportCsvFileAtMinute =
            validator(data, "exportCsvFileAtMinute") || 50;
        this.pingHostsEvery = validator(data, "pingHostsEvery") || 30; //in minutes
        if (this.pingHostsEvery < 5) this.pingHostsEvery = 5;
    }
};
