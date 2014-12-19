module.exports = function (sequelize, DataTypes){

  var Property = sequelize.define("Property", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
        Property.belongsTo(models.Landlord);
        Property.hasMany(models.Receipt);
        Property.hasMany(models.PropertyReport);
      }
    }
  });

  return Property;
};