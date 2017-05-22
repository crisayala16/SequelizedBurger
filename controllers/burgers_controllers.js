var express = require('express');
var methodOverride = require('method-override');
var db = require('./../models');

var router = express.Router();
router.use(methodOverride("_method"));

//Route for the root page
router.get('/', function(req, res){
	var burgers = [];
	var devouredBurgers = [];
	//Getting all burgers from the database
	db.Burger.findAll({}).then(function(data){
		for(var i = 0; i < data.length; i++){
			//if the burger has not been devoured
			if(data[i].dataValues.devoured === false){
				//add it to the burgers array
				burgers.push(data[i].dataValues);
			}
			//if the burger has been devoured
			else{
				//add it to the devoured burgers array
				devouredBurgers.push(data[i].dataValues);
			}
		}
		//display both arrays on page
		res.render('index', {
			burgers: burgers,
			devBurgers: devouredBurgers
		});
	})
});
//Route for changing the burger devoured status
router.put('/:burgerName', function(req, res){
	var burgerToEat = req.params.burgerName;
	db.Burger.update({
		devoured: true
	},
	{
		where: {
			burgerName: burgerToEat
		}
	}).then(function(data){
		res.redirect('/');
	})
});

//Route for add a new burger to the database
router.post('/', function(req, res){
	var newBurger = req.body.burgerName;
	db.Burger.create({
		burgerName: newBurger
	}).then(function(data){
		res.redirect('/');
	})
});

//Route for deleting a burger from the database
router.delete('/:burgerToDelete', function(req, res){
	var doneBurger = req.params.burgerToDelete;
	db.Burger.destroy({
		where: {
			burgerName: doneBurger
		}
	}).then(function(data){
		res.redirect('/');
	})
});

module.exports = router;