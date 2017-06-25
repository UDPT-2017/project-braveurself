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
	  	}
	},

	checkPassword: function(username, password, cb) {
		var salt_pw = bcrypt.genSaltSync(saltRounds);
		password = bcrypt.hashSync('admin', salt_pw);

		//Get user from database
		let psDB = bcrypt.hashSync('admin', salt_pw);
		let err = null;
		cb(err, password == psDB);
	},
};

