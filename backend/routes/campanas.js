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

	//Validaciones
	req.checkBody("title","Entre un titulo alfanumérico entre 4 y 50 caracteres").isLength(4,50);
	req.checkBody("desc","Entre una descripción con letras entre 4 y 250 caracteres").isLength(4,250);
	req.checkBody("grupos","Debe ingresar grupos").notEmpty();
	
	var errors = {};
	errors = req.validationErrors();
	if(!req.body.grupos) {
		errors[errors.length()].msg = 'Debe seleccionar al menos un grupo';
	}
	
	if(errors){
		res.status(400).send(errors);
	}
	else{
		var id = req.params["id"];    
		
		campanasService.update(id,updatedCampana)
			.then(function(campana){
				res.status(200).send(campana);
			},function(error){
				res.status(400).send(error);
			})
	}
	
});


router.get('/', function(req, res, next) {
	//Traigo id de usuario logueado
	var userId = req.user.sub;

	//Traigo campañas por id de usuario
	campanasService.getCampanasUser(userId)
		.then(function (campanas) {
				res.status(200).send(campanas);
		})
		.catch(function (err) {
				res.status(400).send(err);
		});
});

router.get('/:id', function(req, res, next) {
	var id = req.params["id"];    
	
	//Traigo campaña por id
	campanasService.getById(id)
		.then(function (campana) {
				if(!campana){
					res.status(404).send('No existe la campaña');
				} 
				else{
					//Si alguien intenta acceder a campaña ajena o esta borrada se envía error
					if(req.user.sub != campana.idUser || campana.deleted != "false"){
						res.status(400).send('No se puede ver la campaña');
					} 
					else {
						res.status(200).send(campana);
					}
				}
		})
		.catch(function (err) {
				res.status(400).send(err);
		});
	
});

router.delete('/:id', function(req, res, next) {
	var id = req.params["id"];    
	var campana = req.body;
	campana.deleted = 'true';

	//Uso el metodo update con el cambio de poner la campaña como borrada en el campo deleted
	campanasService.update(id,campana)
		.then(function(campana){
			res.status(200).send(campana);
		},function(error){
			res.status(400).send(error);
		})
	
});


router.post('/', function(req, res, next) {

	//Validaciones
	req.checkBody("title","Entre un titulo alfanumérico entre 4 y 50 caracteres").isLength(4,50);
	req.checkBody("desc","Entre una descripción con letras entre 4 y 250 caracteres").isLength(4,250);
	
	var errors = {};
	errors = req.validationErrors();
	
	if(!req.body.grupos) {
		errors[errors.length()].msg = 'Debe seleccionar al menos un grupo';
	}
	if(errors){
		res.status(400).send(errors);
	}
	else{
		//Le agrego el id del usuario que la crea
		var campana = req.body;
		campana.idUser = req.user.sub;
		campana.deleted = 'false';
		//Llamo al servicio de mongoose para agregarla
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
