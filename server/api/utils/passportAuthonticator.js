const passport = require('passport');
const loginEnabled = require('../../app.config').get().loginEnabled;
module.exports = loginEnabled ? passport.authenticate('jwt', { session: false }) : null;
