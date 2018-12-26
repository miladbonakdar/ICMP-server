module.exports = (data, datapropertyKey) => {
    if (!data) return undefined;
    if (!data[datapropertyKey]) return undefined;
    return data[datapropertyKey];
};
