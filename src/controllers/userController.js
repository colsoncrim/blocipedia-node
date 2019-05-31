
const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    signUp(req, res, next) {
        res.render("users/signup");
    },
    create(req, res, next) {
        //#1
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };
        // #2
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/signup");
            } else {

                // #3
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "Welcome!");
                    res.redirect("/");

                    const sgMail = require('@sendgrid/mail');
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: 'test@example.com',
                        from: 'test@example.com',
                        subject: 'Sending with Twilio SendGrid is Fun',
                        text: 'and easy to do anywhere, even with Node.js.',
                        html: '<strong>and easy to do anywhere, even with Node.js.</strong>',
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