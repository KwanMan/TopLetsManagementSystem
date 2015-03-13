module.exports = function (sequelize, DataTypes){

  var LandlordReport = sequelize.define("LandlordReport", {
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
        LandlordReport.belongsTo(models.Landlord);
        LandlordReport.hasMany(models.PropertyReport);
      }
    }
  });

  return LandlordReport;

};