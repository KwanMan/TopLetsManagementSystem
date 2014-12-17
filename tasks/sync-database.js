var models = require("../app/models");

module.exports = function(grunt) {

  grunt.registerTask("sync-database", function() {
    models.sequelize.sync({force: true}).success(function (){

      // Create some random data
      models.Landlord.create({
        forename: "Mitchell",
        surname: "Smith"
      }).then(function (landlord){
        models.Property.bulkCreate([{
          number: 69,
          street: "Rydal Avenue",
          postcode: "LE11 3RU"
        }, {
          number: 108,
          street: "Paget Street",
          postcode: "LE11 5DU"
        }]).then(function (properties){
          landlord.setProperties(properties);
        });
      });
      
      models.Landlord.create({
        forename: "Arry",
        surname: "Noname"
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