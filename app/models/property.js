module.exports = function (sequelize, DataTypes){

  var Property = sequelize.define("Property", {
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    getterMethods: {
      shortAddress : function() {
        return this.number + ' ' + this.street;
      },
      longAddress : function() {
        return this.number + ' ' + this.street + ', ' + this.postcode;
      }
    },
    classMethods: {
      associate: function(models) {
        Property.belongsTo(models.Landlord);
        Property.hasMany(models.Receipt);
        Property.hasMany(models.PropertyReport);
        Property.hasMany(models.Contract);
      }
    }
  });

  return Property;
};