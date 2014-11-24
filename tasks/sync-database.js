var models = require("../app/models");

module.exports = function(grunt) {

  grunt.registerTask("sync-database", function() {
    models.sequelize.sync({force: true}).success(function (){

      // Create some random data
      models.Landlord.create({
        forename: "Mitchell",
        surname: "Smith"
      }).success(function (landlord){
        models.Property.bulkCreate([{
          number: 69,
          street: "Rydal Avenue",
          postcode: "LE11 3RU"
        }, {
          number: 108,
          street: "Paget Street",
          postcode: "LE11 5DU"
        }]).success(function (){
          models.Property.findAll().success(function (properties){
            landlord.setProperties(properties);
          });
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


    });

  });
};