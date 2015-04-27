module.exports = function (sequelize, DataTypes){

  var PropertyReport = sequelize.define("PropertyReport", {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
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
        PropertyReport.hasMany(models.Receipt);
        PropertyReport.hasMany(models.RentPayment);
        PropertyReport.hasMany(models.Fee);
      }
    }
  });

  return PropertyReport;

};