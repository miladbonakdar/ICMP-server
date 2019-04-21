module.exports = () => {
    Date.prototype.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    Date.prototype.getDayName = function() {
        return this.weekDays[this.getDay()];
    };

    Date.prototype.getNowFileName = function() {
        return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()} ${this.getDayName()}`;
    };
};
