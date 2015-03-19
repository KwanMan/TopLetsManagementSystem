module.exports = function (sequelize, DataTypes){

  var Fee = sequelize.define("Fee", {
    note: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models){
        Fee.belongsTo(models.PropertyReport);
      }
    }
  });

  return Fee;

};