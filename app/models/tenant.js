module.exports = function (sequelize, DataTypes){

  var Tenant = sequelize.define("Tenant", {
    forename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    classMethods: {
      associate: function (models){
        Tenant.hasMany(models.RentPayment);
        Tenant.belongsToMany(models.Contract, {through: 'ContractTenant'});
      }
    }
  });

  return Tenant;

};