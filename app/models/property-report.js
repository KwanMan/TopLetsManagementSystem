module.exports = function (sequelize, DataTypes){

  var PropertyReport = sequelize.define("PropertyReport", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models){
        PropertyReport.belongsTo(models.Property);
        PropertyReport.belongsTo(models.LandlordReport);
        PropertyReport.hasMany(models.Receipt);
      }
    }
  });

  return PropertyReport;

};