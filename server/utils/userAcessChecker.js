const loginEnabled = require('../app.config').get().loginEnabled;

const types = {
    dashboardPage: 'dashboardPage',
    settingPage: 'settingPage',
    logPage: 'logPage',
    userPage: 'userPage',
    modifyArea: 'modifyArea',
    modifyNode: 'modifyNode',
    modifyUser: 'modifyUser',
    ping: 'ping',
    export: 'export'
};

const sysAdminAccess = () => {
    return {
        rollName: 'sysAdmin',
        access: {
            dashboardPage: true,
            settingPage: true,
            logPage: true,
            userPage: true,
            modifyArea: true,
            modifyNode: true,
            modifyUser: true,
            ping: true,
            export: true
        }
    };
};

const adminAccess = () => {
    return {
        rollName: 'admin',
        access: {
            dashboardPage: true,
            settingPage: false,
            logPage: true,
            userPage: false,
            modifyArea: true,
            modifyNode: true,
            modifyUser: false,
            ping: true,
            export: true
        }
    };
};

const monitorAccess = () => {
    return {
        rollName: 'monitor',
        access: {
            dashboardPage: true,
            settingPage: false,
            logPage: true,
            userPage: false,
            modifyArea: false,
            modifyNode: false,
            modifyUser: false,
            ping: false,
            export: true
        }
    };
};

const accessChecker = (user, ...access) => {
    if (!loginEnabled) return true;
    if (!user) return false;
    if (!user.roll) return false;
    if (!user.roll.rollName) return false;
    if (!user.roll.access) return false;

    let hasAccess = true;
    access.forEach(a => {
        hasAccess = hasAccess && user.roll.access[a];
    });

    return hasAccess;
};

module.exports = {
    checker: accessChecker,
    types,
    sysAdminAccess,
    adminAccess,
    monitorAccess
};
