var models = require('../app/models');
var when = require('when');
var _ = require("lodash");

module.exports = function(grunt) {

  grunt.registerTask("sync-database", function() {
    models.sequelize.sync({force: true}).success(function (){


      var landlords = [{
        forename: "Arianna",
        surname: "Ramirez",
        email: "arianna@ramirez.com",
        contactNumber: "07888999888",
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
        email: "sergio@davidson.com",
        contactNumber: "07888999888",
        properties: [{
          number: 8315,
          street: "West Alexander Road",
          postcode: "LE11 3RU"
        }, {
          number: 7966,
          street: "Saddle Drive",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Mattie",
        surname: "Wheeler",
        email: "mattie@wheeler.com",
        contactNumber: "07888999888",
        properties: [{
          number: 5634,
          street: "Hogan Street",
          postcode: "LE11 3RU"
        }, {
          number: 6462,
          street: "Eason Road",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Suzanne",
        surname: "Burke",
        email: "suzanne@burke.com",
        contactNumber: "07888999888",
        properties: [{
          number: 2606,
          street: "Walnut Hill Lane",
          postcode: "LE11 3RU"
        }, {
          number: 6649,
          street: "Cedar Drive",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Harry",
        surname: "Cole",
        email: "harry@cole.com",
        contactNumber: "07888999888",
        properties: [{
          number: 2419,
          street: "Paddington Court",
          postcode: "LE11 3RU"
        }, {
          number: 8247,
          street: "Robinson Road",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Penny",
        surname: "Perry",
        email: "penny@perry.com",
        contactNumber: "07888999888",
        properties: [{
          number: 6803,
          street: "Adams Street",
          postcode: "LE11 3RU"
        }, {
          number: 2806,
          street: "Lone Wolf Trail",
          postcode: "LE11 3BN"
        }]
      }, {
        forename: "Bella",
        surname: "Alvarez",
        email: "bella@alvarez.com",
        contactNumber: "07888999888",
        properties: [{
          number: 5724,
          street: "Kelly Drive",
          postcode: "LE11 3RU"
        }, {
          number: 6037,
          street: "Lake View Drive",
          postcode: "LE11 3BN"
        }]
      }];


      when.map(landlords, function (landlordData){
        models.Landlord.create(_.assign(landlordData, {address: "Random address \r\n Line 2"})).then(function (landlord){
          when.map(landlordData.properties, function (propertyData){
            var rooms = Math.floor((Math.random() * 5) + 2);
            models.Property.create(_.assign(propertyData, {bedrooms: rooms})).then(function (property){
              property.setLandlord(landlord);
            });
          });
        });
      });

      models.Admin.create({
        username: "admin",
        password: "adminpass"
      });

      models.Tenant.bulkCreate([{
        forename: "Tommy",
        surname: "Kwan",
        idNumber: "B123456",
        email: "tommy@email.com",
        contactNumber: "07782736465"
      }, {
        forename: "Sophie",
        surname: "Keen",
        idNumber: "B123456",
        email: "sophie@email.com",
        contactNumber: "07787364999"
      }, {
        forename: "Alexander",
        surname: "Taylor",
        idNumber: "B123456",
        email: "alex@email.com",
        contactNumber: "07853890543"
      }, {
        forename: "Josh",
        surname: "Roupie",
        idNumber: "B123456",
        email: "josh@email.com",
        contactNumber: "07456876555"
      }, {
        forename: "Harry",
        surname: "Jenkins",
        idNumber: "B123456",
        email: "harry@email.com",
        contactNumber: "07098234769"
      }, {
        forename: "Rob",
        surname: "Game",
        idNumber: "B123456",
        email: "rob@email.com",
        contactNumber: "07123456789"
      }]);


    });

  });
};