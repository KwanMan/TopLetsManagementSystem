var express = require('express');
var bodyParser = require('body-parser');
var models = require('./models');

var landlords = require('./routes/landlords');
var properties = require('./routes/properties');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entended: false}));

app.use('/landlords', landlords);
app.use('/properties', properties);

app.set('port', process.env.PORT || 3000);

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

	var server = app.listen(app.get('port'));
});

