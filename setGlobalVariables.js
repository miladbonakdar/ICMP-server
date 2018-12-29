module.exports = () => {
    global.__baseDirname = __dirname;
    global.isDebugMode = true; //for production or debug mode
};
