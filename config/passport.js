const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = (passport) => {
    let opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt'); //use this or below
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);      
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if(err) return done(err, false);

            if(user) return done(null, user);
                else return done(null, false);
        });
    }));
};