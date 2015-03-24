module.exports = function (sequelize, DataTypes){

  var Log = sequelize.define("Log", {
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models){
        Log.belongsTo(models.Admin);
      }
    }
  });

  return Log;
};