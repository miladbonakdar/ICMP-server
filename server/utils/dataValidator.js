module.exports = (data, datapropertyKey, required = false) => {
    if (required) {
        if (!data)
            throw new Error(
                `data is required. field name ='${datapropertyKey}'`
            );
        if (!data[datapropertyKey])
            throw new Error(`${datapropertyKey} is required.'`);
    } else {
        if (!data) return undefined;
        if (!data[datapropertyKey]) return undefined;
    }
    return data[datapropertyKey];
};
