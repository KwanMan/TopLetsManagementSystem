var when = require('when');

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
    }, 
    instanceMethods: {
      getTenants: function (){

        return when(this.getRentPayments()).then(function (rentPayments){
          return when.reduce(rentPayments, function (tenants, rentPayment, index){
            var tenantMatches = function (incoming, current, index, array){
              return incoming.id === current.id;
            };

            return when(rentPayment.getTenant()).then(function (tenant){
              if (!tenants.some(tenantMatches.bind(tenantMatches, tenant))){
                // Only add to array if tenant is not already in there
                return tenants.concat(tenant);
              }
              return tenants;
            });
          }, []);
        });

      },

      getUnpaidPayments: function (){
        return when(this.getRentPayments()).then(function (rentPayments){
          return when.filter(rentPayments, function (rentPayment){
            return !rentPayment.paid;
          });
        });
      }
    }
  });

  return Contract;

};