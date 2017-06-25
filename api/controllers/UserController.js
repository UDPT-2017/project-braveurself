/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function (req, res) {
        // let username = req.body.username;
        // let password = res.body.password;

        let username = 'admin';
        let password = 'admin';
        let rememberMe = true;

        User.checkPassword(username, password, function (err, auth) {
            if (auth) {
                req.session.authenticated = true;
                if (rememberMe) {
                    res.cookie('uniqueID','randomNumber', { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
                }
                res.send('Login');
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
