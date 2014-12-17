var dateUtils = require('../utils/date');

module.exports = function (sequelize, DataTypes){

  var AccessToken = sequelize.define("AccessToken", {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function (models){
        AccessToken.belongsTo(models.Admin);
      }
    },
    instanceMethods: {
      expired: function (){
        return dateUtils.hasTimePassed(this.expiry);
      }
    }
  });

  return AccessToken;
};