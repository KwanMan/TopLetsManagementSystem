var models = require('../app/models');
var when = require('when');

module.exports = function(grunt) {

  grunt.registerTask("sync-database", function() {
    models.sequelize.sync({force: true}).success(function (){


      var landlords = [{
        forename: "Mitchell",
        surname: "Smith",
        properties: [{
          number: 69,
          street: "Rydal Avenue",
          postcode: "LE11 3RU"
        }, {
          number: 52,
          street: "Granville Street",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Arry",
        surname: "Noname",
        properties: [{
          number: 108,
          street: "Paget Street",
          postcode: "LE11 5DU"
        }, {
          number: 14,
          street: "Oxford Street",
          postcode: "LE11 5DR"
        }]
      }];


      when.map(landlords, function (landlordData){
        models.Landlord.create(landlordData).then(function (landlord){
          when.map(landlordData.properties, function (propertyData){
            models.Property.create(propertyData).then(function (property){
              property.setLandlord(landlord);
            });
          });
        });
      });

      
      models.User.create({
        username: "tommy",
        password: "password"
      });

      models.Admin.create({
        username: "admin",
        password: "adminpass"
      });

      models.Tenant.bulkCreate([{
        forename: "Tommy",
        surname: "Kwan"
      }, {
        forename: "Sophie",
        surname: "Keen"
      }, {
        forename: "Alexander",
        surname: "Taylor"
      }, {
        forename: "Josh",
        surname: "Roupie"
      }, {
        forename: "Harry",
        surname: "Jenkins"
      }, {
        forename: "Rob",
        surname: "Game"
      }]);


    });

  });
};