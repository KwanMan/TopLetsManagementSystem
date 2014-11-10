module.exports = function (sequelize, DataTypes){
  
  var Landlord = sequelize.define("Landlord", {
    forename: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models){
        Landlord.hasMany(models.Property)
      }
    }
  });

  return Landlord;
};