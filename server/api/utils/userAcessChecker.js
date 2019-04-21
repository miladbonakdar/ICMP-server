const loginEnabled = require('../../app.config').get().loginEnabled;

module.exports = (user, acess) => {
    if (!loginEnabled) return true;
    if (!user) return false;
    if (!user.roll) return false;
    if (!user.roll.rollName) return false;
    if (acess == 'all') return true;
    if (acess == 'allAdmin' && (user.roll.rollName == 'admin' || user.roll.rollName == 'sysAdmin')) return true;
    if (acess == 'sysAdmin' && user.roll.rollName == 'sysAdmin') return true;
    return false;
};
