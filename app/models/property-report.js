module.exports = function (sequelize, DataTypes){

  var PropertyReport = sequelize.define("PropertyReport", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finalised: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function (models){
        PropertyReport.belongsTo(models.Property);
        PropertyReport.belongsTo(models.LandlordReport);
        PropertyReport.hasMany(models.Receipt);
        PropertyReport.hasMany(models.RentPayment);
      }
    }
  });

  return PropertyReport;

};