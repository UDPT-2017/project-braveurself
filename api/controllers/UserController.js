/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: function (req, res) {
        let emailAddress = req.body.emailAddress;
        let password = req.body.password;
        let rememberMe = req.body.rememberMe;

        User.checkPassword(emailAddress, password, function (err, auth, userId) {
            if (err) {
                req.session.flash = {
                    error: 'Your email or password was incorrect'
                };
                res.redirect('/login');
            }
            if (auth) {
                req.session.authenticated = true;
                req.session.userId = userId;
                if (rememberMe) {
                    res.cookie('uniqueID','username', { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
                }
                res.redirect('/');
            } else {
                req.session.flash = {
                    error: 'Your email or password was incorrect'
                };
                res.redirect('/login');
            }
            req.session.flash = {};
        })
    },

    logout: function (req, res) {
        if (req.session.authenticated) {
            req.session.destroy();
        }
        if (req.cookies.uniqueID) {
            res.cookie('uniqueID','', { maxAge: -10, httpOnly: true });
        }
        res.send('Logout');
    },

    create: function (req, res) {
        let user = req.body;

        //at first, we need to check whether user email exist or not

        //assign encrypted password to user password
        user.password = user.password;

        //assign a default value to user rate, therefore the user will be bidded a product

        User.create({
            name: user.name,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber,
            rate: user.rate,
            password: user.password,
            pw_salt: user.pw_salt
        }).exec(function(err, newuser) {
            
        });
    }
};
