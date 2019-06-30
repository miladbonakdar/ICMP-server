const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwt_token = require('../../app.config').get().jwt_secret;

module.exports = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            res.echo(info.message, null, false, 401);
            return;
        }

        req.login(user, { session: false }, err => {
            if (err) res.internalServerError(err);

            const token = jwt.sign(user.toJSON(), jwt_token, { expiresIn: '10d' });
            res.success({ user, token }, 'user loged in successfuly');
        });
    })(req, res);
};
