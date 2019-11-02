const config = {
    apiPortNumber: Number(process.env.API_PORT_NUMBER),
    databaseName: process.env.DATABASE_NAME,
    loginEnabled: process.env.LOGIN_ENABLED == 'true',
    mongoUser: process.env.MONGO_USER,
    mongoPass: process.env.MONGO_PASS,
    mongoServer: process.env.MONGO_SERVER,
    mongoPort: Number(process.env.MONGO_PORT),
    jwt_secret: process.env.JWT_SECRET,
    sysAdminUsername: process.env.SYSADMIN_USERNAME,
    sysAdminPassword: process.env.SYSADMIN_PASSWORD,
    sysAdminEmail: process.env.SYSADMIN_EMAIL
};

console.log(config);

module.exports = {
    get: () => config,
    getMongoConnectionUrl: () =>
        `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoServer}:${config.mongoPort}/${config.databaseName}?authSource=admin`
};
