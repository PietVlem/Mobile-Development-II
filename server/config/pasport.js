const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('../config/index');
const User = require('../api/models/user');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-plus-token');

/*
JSON WEB TOKENS STRATEGY
*/
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

/*
LOCAL LOGIN STRATEGY
*/
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

/*
FACEBOOK LOGIN STRATEGY
*/
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: '356486918212490',
    clientSecret: 'ca5ff40fbc7dab21b178c916c83d4bf7'
}, async function (accesToken, refreshToken, profile, done) {
    try {
        console.log('profile', profile);
        console.log('refreshToken', refreshToken);
        console.log('accesToken', accesToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        })
        await newUser.save();
        done(null, newUser);

    } catch (error) {
        done(error, false, error.message)
    }
}))

/*
GOOGLE LOGIN STRATEGY
*/
passport.use('googleToken', new GoogleTokenStrategy({
    clientID: '742808182133-8n65uuqra6ebdn2iaq5it7e7g48a6jn5.apps.googleusercontent.com',
    clientSecret: 'ak2y4fXW30u92Keh2-lhEN-B'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            console.log('already exists!')
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));