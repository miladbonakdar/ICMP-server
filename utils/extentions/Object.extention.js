module.exports = () => {
    Object.prototype.merge = function(...items) {
        items.forEach(item => {
            if (typeof item !== "object" || item === null) throw new Error("items most be objects");
            this.extendObject(this, item);
        });
        return this;
    };

    Object.prototype.extendObject = function(obj, src) {
        Object.keys(src).forEach(function(key) {
            obj[key] = src[key];
        });
        return obj;
    };
};
