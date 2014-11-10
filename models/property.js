module.exports = function (sequelize, DataTypes){

	var Property = sequelize.define("Property", {
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		number: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false
		},
		postcode: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		classMethods: {
			associate: function(models) {
				Property.belongsTo(models.Landlord)
			}
		}
	});

	return Property;
};