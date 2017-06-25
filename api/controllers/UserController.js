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

        User.checkPassword(emailAddress, password, function (err, auth) {
            if (auth) {
                User.findOne({email: emailAddress}).exec(function(err, result) {
                    console.log(result);
                })
                req.session.authenticated = true;
                if (rememberMe) {
                    res.cookie('uniqueID','username', { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
                }
                res.redirect('/');
            } else {
                res.send('Your username or your password is wrong');
            }
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
    }
};
