const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwt_token = require('../../app.config').get().jwt_secret;
const response = require('./response');

module.exports = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            response.echo(res, 'Login failed', null, false, 401);
            return;
        }

        req.login(user, { session: false }, err => {
            if (err) response.internalServerError(res, err);

            const token = jwt.sign(user.toJSON(), jwt_token, { expiresIn: '10d' });
            response.success(res, { user, token }, 'user loged in successfuly');
        });
    })(req, res);
};
