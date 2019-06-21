
const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    signUp(req, res, next) {
        res.render("users/signup");
    },
    create(req, res, next) {
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/signup");
            } else {

                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "Welcome!");
                    res.redirect("/");

                    const sgMail = require('@sendgrid/mail');

                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                    const msg = {
                        to: 'colsoncrim1@gmail.com',
                        from: 'test@example.com',
                        subject: 'Welcome to Blocipedia',
                        text: 'Thanks for signing up!.',
                        html: '<strong>Sending with Twilio SendGrid is Fun</strong>',
                    };
                    sgMail.send(msg);
                })
            }
        });
    },

    signInForm(req, res, next) {
        res.render("users/sign_in");
    },

    signIn(req, res, next) {
        passport.authenticate("local")(req, res, function () {
            if (!req.user) {
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },

    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    }
}