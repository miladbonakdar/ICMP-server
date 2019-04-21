const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("./repositories/mongoModels/user.model");
const LocalStrategy = require("passport-local").Strategy;
const jwt_secret = require("./app.config").get().jwt_secret;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

module.exports = () => {
    const localStrategyMiddleware = async function(username, password, done) {
        let user;
        try {
            user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: "No user by that username" });
            }
        } catch (e) {
            return done(e);
        }

        let match = await user.comparePassword(password);
        if (!match) {
            return done(null, false, { message: "Not a matching password" });
        }
        return done(null, user);
    };

    passport.use(
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        }),
        localStrategyMiddleware
    );

    const JWTStrategyMiddleware = async function(jwtPayload, done) {
        try {
            const user = await User.findById(jwtPayload.id);
            if (!user) {
                return done(null, false, { message: "cannot fine the user" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    };

    passport.use(
        new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt_secret
        }),
        JWTStrategyMiddleware
    );
};
