module.exports = function (sequelize, DataTypes){
  
  var Landlord = sequelize.define("Landlord", {
    forename: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    getterMethods: {
      fullName : function() {
        return this.forename + ' ' + this.surname;
      }
    },
    classMethods: {
      associate: function(models){
        Landlord.hasMany(models.Property);
        Landlord.hasMany(models.LandlordReport);
      }
    }
  });

  return Landlord;
};