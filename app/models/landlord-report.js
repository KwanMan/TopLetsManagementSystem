module.exports = function (sequelize, DataTypes){

  var LandlordReport = sequelize.define("LandlordReport", {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models){
        LandlordReport.belongsTo(models.Landlord);
        LandlordReport.hasMany(models.PropertyReport);
      }
    }
  });

  return LandlordReport;

};