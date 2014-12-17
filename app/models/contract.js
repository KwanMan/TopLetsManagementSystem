module.exports = function (sequelize, DataTypes){

  var Contract = sequelize.define("Contract", {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models){
        Contract.hasMany(models.RentPayment);
      }
    }
  });

  return Contract;

};