module.exports = function (sequelize, DataTypes){

  var Receipt = sequelize.define("Receipt", {
    payee: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function (models){
        Receipt.belongsTo(models.Property);
        Receipt.belongsTo(models.PropertyReport);
      }
    }
  });

  return Receipt;

};