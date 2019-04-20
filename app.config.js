const config = {
    apiPortNumber: 3000,
    databaseName: "icmpDb",
    mongoUser: "root",
    mongoPass: "root",
    mongoServer: "localhost",
    mongoPort: "27017"
};

module.exports = {
    get: () => config,
    getMongoConnectionUrl: () =>
        `mongodb://${config.mongoUser}:${config.mongoUser}@${config.mongoServer}:${config.mongoPort}/${
            config.databaseName
        }?authSource=admin`
};
