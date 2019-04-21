global.__baseDirname = __dirname;
global.isDebugMode = process.env.NODE_ENV === 'production' ? false: true; //for production or debug mode