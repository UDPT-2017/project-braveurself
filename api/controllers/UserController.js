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

    login: function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let rememberMe = req.body.rememberMe;
        User.checkAuthenticate(email, password, function(err, auth, userId) {
            if (err) {
                switch (err) {
                    case 1:
                        res.view('user/confirmEmail', {
                            layout: null
                        })
                        break;

                    default:
                        req.session.flash = {
                            error: 'Your email or password was incorrect'
                        };
                        res.redirect('/login');
                        break;
                }
                return;
            }
            if (auth) {
                req.session.authenticated = true;
                req.session.userId = userId;
                if (rememberMe) {
                    res.cookie('uniqueID', 'username', { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
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

    logout: function(req, res) {
        if (req.session.authenticated) {
            req.session.destroy();
        } else {
            res.redirect('/login');
        }
        if (req.cookies.uniqueID) {
            res.cookie('uniqueID', '', { maxAge: -10, httpOnly: true });
        }
        res.redirect('/');
    },

    create: function(req, res) {

        let user = req.body;

        //assign a default value to user rate, therefore the user will be bidded a product
        let defaultRate = 100;

        //at first, we need to check whether user email exist or not
        User.findOne({ email: user.email }).exec(function(err, existingUser) {
            if (err) {
                res.send('There are some thing wrong');
                return;
            } else if (existingUser) {
                res.send('Username already be used!');
                return;
            } else {
                EmailService.sendValidateEmail(user.email, function(error, token) {
                    if (error) {
                        res.send('there are some thing wrong!');
                    } else {
                        user.rate = defaultRate;
                        User.createUser({
                            name: user.name,
                            email: user.email,
                            address: user.address,
                            phoneNumber: user.phoneNumber,
                            rate: user.rate,
                            password: user.password,
                            token: token
                        }, function(err, newuser) {
                            if (err) {
                                res.send('There are some thing wrong');
                            } else {
                                res.view('user/confirmEmail', {
                                    layout: null
                                })
                            }
                        });
                    }
                });
            }
        })
    },

    validate_email: function(req, res) {
        let query = req.query;
        User.confirmEmail(query.email, query.token, function(err, isVaidated) {
            if (err) {
                res.send(err)
            } else {
                if (isVaidated) {
                    res.redirect('/login');
                } else {
                    res.badRequest();
                }
            }
        })
    },

    findAll: function(req, res) {
        User.find().exec(function(err, result) {
            console.log(err);
            console.log(result);
        })
    }
};