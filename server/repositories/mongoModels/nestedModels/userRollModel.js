module.exports = {
    rollName: String,
    access: {
        dashboardPage: { type: Boolean, default: true },
        settingPage: { type: Boolean, default: false },
        logPage: { type: Boolean, default: true },
        userPage: { type: Boolean, default: true },
        modifyArea: { type: Boolean, default: false },
        modifyNode: { type: Boolean, default: false },
        modifyUser: { type: Boolean, default: false },
        ping: { type: Boolean, default: false },
        export: { type: Boolean, default: true }
    }
};
