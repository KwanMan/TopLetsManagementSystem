var models = require('../models');
var router = require('express').Router();

router.get('/:forename/:surname', function(req, res){
	models.Landlord.find({
		include: [models.Property],
		where: {
			forename: req.param('forename'),
			surname: req.param('surname')
		}
	}).success(function (landlord){
		console.log(landlord.values);
	});
});

router.get('/create/:forename/:surname', function(req, res){
	models.Landlord.create({
		forename: req.param('forename'),
		surname: req.param('surname')
	}).complete(function (err, landlord){
		console.log(landlord.dataValues);
	});
});

module.exports = router;