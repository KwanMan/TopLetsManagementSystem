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
      allowNull: false
    },
    contactNumber: {
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
      associate: function (models){
        Tenant.hasMany(models.RentPayment);
        Tenant.belongsToMany(models.Contract, {through: 'ContractTenant'});
      }
    }
  });

  return Tenant;

};