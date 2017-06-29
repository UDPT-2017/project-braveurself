/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
	attributes: {
		id: {
			type: 'number'
		},
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        phoneNumber: {
            type: 'string'
        },
        rate: {
            type: 'integer'
        },
        password: {
            type: 'string'
        },
        pw_salt: {
            type: 'string'
        },
        token: {
            type: 'string'
        },
		role: {
			type: 'integer'
		}
    },

	//callback(error: number, auth: boolean, useId: number)
	checkAuthenticate: function(email, password, cb) {
		User.findOne({email: email}).exec(function(err, user) {
			if (user) {
				if (user.token != null) {
					cb(1, false, null);
				} else {
					var salt_pw = user.pw_salt;
					hashPassword = bcrypt.hashSync(password, salt_pw);
					cb(err, hashPassword == user.password, user.id);
				}
			}
			else 
				cb(err, false, null);
		})
	},

	createUser: function(user, cb) {
		user.pw_salt = bcrypt.genSaltSync(saltRounds);
		user.password = bcrypt.hashSync(user.password, user.pw_salt);
		User.create(user).exec(function(err, newuser) {
            if (err) {
				console.log(err);
				cb(err, null);
			}
			else 
				cb(null, newuser)
        });
	},

	//Callback(error: number, isValidated: boolean)
	confirmEmail: function(email, token, cb) {
		User.findOne({email: email}, function(err, user) {
			if (err) return cb(err);
			if (user) {
				if (user.token == token) {
					user.token = null;
					user.save(function(err) {
						cb(null, true);
					})
				} else {
					cb(null, false);
				}
			}
		})
	},

	updatePassword: function(email, password, cb) {
		let pw_salt = bcrypt.genSaltSync(saltRounds);
		password = bcrypt.hashSync(password, pw_salt);
		User.findOne({email: email}, function(error, user) {
			if (error) return cb(error);
			user.password = password;
			user.pw_salt = pw_salt;
			user.save(function(error) {
				if (error) return cb(error);
				cb(null);
			})
		})
	},

	updateUser: function(user, cb) {
        User.findOne({id: user.id}, function(error, oldUser) {
            if (error) return cb(error);
			oldUser.pw_salt = bcrypt.genSaltSync(saltRounds);
			oldUser.password = bcrypt.hashSync(user.password, oldUser.pw_salt);
            oldUser.email = user.email;
            oldUser.name = user.name;
            oldUser.address = user.address;
            oldUser.phoneNumber = user.phoneNumber;
			oldUser.save(function(error) {
				if (error) return cb(error);
				cb(null);
			})
        })
	}
};