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
	  		type: 'string'
	  	},
		password: {
			type: 'string'
		},
		pw_salt: {
			type: 'string'
		}
	},

	checkPassword: function(email, password, cb) {
		User.findOne({email: email}).exec(function(err, user) {
			if (user) {
				var salt_pw = user.pw_salt;
				hashPassword = bcrypt.hashSync(password, salt_pw);
				cb(err, hashPassword == user.password, user.id);
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
	}
};

