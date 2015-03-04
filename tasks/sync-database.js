var models = require('../app/models');
var when = require('when');

module.exports = function(grunt) {

  grunt.registerTask("sync-database", function() {
    models.sequelize.sync({force: true}).success(function (){


      var landlords = [{
        forename: "Arianna",
        surname: "Ramirez",
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
        forename: "Sergio",
        surname: "Davidson",
        properties: [{
          number: 8315,
          street: "W Alexander Rd",
          postcode: "LE11 3RU"
        }, {
          number: 7966,
          street: "Saddle Dr",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Mattie",
        surname: "Wheeler",
        properties: [{
          number: 5634,
          street: "Hogan St",
          postcode: "LE11 3RU"
        }, {
          number: 6462,
          street: "Eason Rd",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Suzanne",
        surname: "Burke",
        properties: [{
          number: 2606,
          street: "Walnut Hill Ln",
          postcode: "LE11 3RU"
        }, {
          number: 6649,
          street: "Cedar Dr",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Harry",
        surname: "Cole",
        properties: [{
          number: 2419,
          street: "Paddington Ct",
          postcode: "LE11 3RU"
        }, {
          number: 8247,
          street: "Robinson Rd",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Penny",
        surname: "Perry",
        properties: [{
          number: 6803,
          street: "Adams St",
          postcode: "LE11 3RU"
        }, {
          number: 2806,
          street: "Lone Wolf Trail",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Bella",
        surname: "Alvarez",
        properties: [{
          number: 5724,
          street: "Kelly Dr",
          postcode: "LE11 3RU"
        }, {
          number: 6037,
          street: "Lake View Dr",
          postcode: "LE11 3BN"
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