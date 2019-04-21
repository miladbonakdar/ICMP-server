const config = {
    apiPortNumber: 3000,
    databaseName: 'icmpDb',
    loginEnabled: false,
    mongoUser: 'root', //to the env
    mongoPass: 'root', //to the env
    mongoServer: 'localhost', //to the env
    mongoPort: '27017', //to the env
    jwt_secret: 'thisisasecrettextforicmpprojectauth' //to the env
};

module.exports = {
    get: () => config,
    getMongoConnectionUrl: () =>
        `mongodb://${config.mongoUser}:${config.mongoUser}@${config.mongoServer}:${config.mongoPort}/${
            config.databaseName
        }?authSource=admin`
};
