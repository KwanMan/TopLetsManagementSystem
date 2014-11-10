var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes){

	var User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type:DataTypes.STRING,
			allowNull: false,
			set: function (raw){
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(raw, salt);

				this.setDataValue('password', hash);
			}
		}
	}, {
		instanceMethods: {
			verifyPassword: function (password, cb){
				bcrypt.compare(password, this.password, function (err, isMatch){
					if (err){ return cb(err); }
					cb(null, isMatch);
				});
			}
		}
	});

	return User;
};