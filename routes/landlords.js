var models = require('../models');
var router = require('express').Router();
var authController = require('../middleware/auth');

router.route('/')

	// Get all
	.get(authController.isAuthenticated, function (req, res){
		models.Landlord.findAll().success(function (landlords){
			res.send(landlords);
		});
	})

	// Create new
	.post(function (req, res){
		models.Landlord.create(req.body).complete(function (err, landlord){
			if (err){
				res.status(404);
				res.send(err);
			} else {
				res.send(landlord);
			}
		});
	})

	// Delete all
	.delete(function (req, res){
		models.Landlord.destroy({
			truncate: true
		}).success(function (affectedRows){
			res.sendStatus(200);
		});
	});

router.route('/:id')

	// Get by ID
	.get(function (req, res){
		models.Landlord.find({
			where: {
				id: req.param('id')
			}
		}).success(function (landlord){
			res.send(landlord);
		});
	})

	// Delete by ID
	.delete(function (req, res, next){
		models.Landlord.find({
			where: {
				id: req.param('id')
			}
		}).success(function (landlord){
			landlord.destroy().success(function (){
				res.sendStatus(200);
			});
		});
	});

module.exports = router;