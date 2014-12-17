module.exports = function (sequelize, DataTypes){

  var RentPayment = sequelize.define("RentPayment", {
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function (models){
        RentPayment.belongsTo(models.Contract);
        RentPayment.belongsTo(models.Tenant);
      }
    }
  });

  return RentPayment;

};