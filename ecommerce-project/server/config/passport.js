const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Kiểm tra user đã tồn tại chưa
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // Cập nhật thông tin Google nếu chưa có
            if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
            }
        } else {
            // Tạo user mới
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                password: Math.random().toString(36).slice(-8), // Random password
                isEmailVerified: true
            });
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            if (!user.facebookId) {
                user.facebookId = profile.id;
                await user.save();
            }
        } else {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                facebookId: profile.id,
                password: Math.random().toString(36).slice(-8),
                isEmailVerified: true
            });
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
