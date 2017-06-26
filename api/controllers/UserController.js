/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    showLogin: function(req, res) {
        res.view('user/login', {
            layout: null
        })
    },

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
        } else {
            res.redirect('/login');
        }
        if (req.cookies.uniqueID) {
            res.cookie('uniqueID','', { maxAge: -10, httpOnly: true });
        }
        res.send('Logout');
    },

    create: function (req, res) {

        // let user = req.body;
        let user = {
            name: 'Nguyen',
            email: 'pqnguyen1996@gmail.com',
            address: 'P.3 Q.2',
            phoneNumber: '0921122128',
            password: 'admin'
        }

        //assign a default value to user rate, therefore the user will be bidded a product
        let defaultRate = 100;

        //at first, we need to check whether user email exist or not
        User.findOne({email: user.email}).exec(function(err, existingUser) {
            if (err) {
                res.send('There are some thing wrong');
                return;
            }
            else if (existingUser) {
                res.send('Username already be used!');
                return;
            }
            else {
		user.rate = defaultRate;

		User.createUser({
		name: user.name,
		email: user.email,
		address: user.address,
		phoneNumber: user.phoneNumber,
		rate: user.rate,
		password: user.password,
		},function(err, newuser) {
		if (err) {
			res.send('There are some thing wrong');
		}
		else
			res.send(newuser);
		});
            }
        })
    }
};
