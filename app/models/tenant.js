module.exports = function (sequelize, DataTypes){

  var Tenant = sequelize.define("Tenant", {
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
      associate: function (models){
        Tenant.hasMany(models.RentPayment);
      }
    }
  });

  return Tenant;

};