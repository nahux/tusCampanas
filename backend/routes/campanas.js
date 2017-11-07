var config = require('../config.json');
var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var campanasService = require('../models/campanas.service');

var campanas = [
								{
									id:0,
									title:"Crucero 10 días Brasil",
									desc:"Viaje en crucero de Buenos Aires a Rio de Janeiro", 
									grupos: 
										[{id:0}, {id:1}]
								}];
var campanasById = [
										{
											id:0,
											title:"Crucero 10 días Brasil",
											desc:"Viaje en crucero de Buenos Aires a Rio de Janeiro", 
											grupos: 
												[{id:0}, {id:1}]
										}];

router.put('/:id', function(req, res, next) {
	var updatedCampana = req.body;
	
	var id = req.params["id"];    
	var campana = campanas.find(x => x.id == id);
	if (campana) {
		var index = campanas.indexOf(campana); 
		campanas[index] = updatedCampana;
		campanasById[campana.id] = updatedCampana;
		res.json(campana);
	} else {
			res.status(404).send("not found");
	}
});


router.get('/', function(req, res, next) {
	res.json(campanas);
});

router.get('/:id', function(req, res, next) {
	var id = req.params["id"];    
	var campana = campanasById[id];
	if (campana) {
			res.json(campana);
	} else {
			res.status(404).send("not found");
	}
});

router.delete('/:id', function(req, res, next) {
	var id = req.params["id"];    
	var campana = campanasById[id];
	
	if (campana) {
			delete campanasById[id];
			campanas.splice(campanas.indexOf(campana), 1)
			res.json(campana);
	} else {
			res.status(404).send("not found");
	}
	
});


router.post('/', function(req, res, next) {

	//Validaciones
	req.checkBody("title","Entre un titulo alfanumérico entre 4 y 50 caracteres").isLength(4,50);
	req.checkBody("desc","Entre una descripción con letras entre 4 y 250 caracteres").isLength(4,250);
	
	var errors = {};
	errors = req.validationErrors();
	
	if(!req.body.grupos) {
		errors[0].msg = 'Debe seleccionar al menos un grupo';
	}
	if(errors){
		res.status(400).send(errors);
	}
	else{
		campanasService.create(req.body)
			.then(function () {
					res.sendStatus(200);
			})
			.catch(function (err) {
					res.status(400).send(err);
			});
	}
	
});

module.exports = router;
