var config = require('../config.json');
var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var userService = require('../models/user.service');

//Loh in
router.post('/authenticate', function(req, res) {
	userService.authenticate(req.body.username, req.body.password)
		.then(function (token) {
				if (token) {
						// authentication successful
						res.send({ token: token, username: req.body.username});
				} else {
						// authentication failed
						res.sendStatus(401);
				}
		})
		.catch(function (err) {
				res.status(400).send(err);
		});
});


//Registro
router.post('/register', function(req, res) {

	//Validaciones
	req.checkBody("firstName","Entre un nombre con letras entre 2 y 50 caracteres").isAlpha().isLength(2,50);
	req.checkBody("lastName","Entre un apellido con letras entre 2 y 50 caracteres").isAlpha().isLength(2,50);
	req.checkBody("email","Entre un email válido").isEmail();
	req.checkBody("username","Entre un usuario alfanumérico entre 8 y 30 caracteres").isAlphanumeric().isLength(8,30);
	req.checkBody("password","Entre una contraseña alfanumérica entre 8 y 20 caracteres").isAlphanumeric().isLength(8,20);

	var errors = req.validationErrors();
	if(errors){
		res.status(400).send(errors);
	}
	else{
		// res.status(200).send('todo ok');
		userService.create(req.body)
			.then(function () {
					res.sendStatus(200);
			})
			.catch(function (err) {
					res.status(400).send(err);
			});
	}
});

//Traer usuario logueado
router.get('/current', function(req, res) {
	userService.getById(req.user.sub)
		.then(function (user) {
				if (user) {
						res.send(user);
				} else {
						res.sendStatus(404);
				}
		})
		.catch(function (err) {
				res.status(400).send(err);
		});
});

//Actualizar usuario
router.put('/:_id', function(req, res) {
	var userId = req.user.sub;
	if (req.params._id !== userId) {
			// can only update own account
			return res.status(401).send('You can only update your own account');
	}

	userService.update(userId, req.body)
			.then(function () {
					res.sendStatus(200);
			})
			.catch(function (err) {
					res.status(400).send(err);
			});
});

//Borrar usuario
router.delete('/:_id', function(req, res) {
	var userId = req.user.sub;
	if (req.params._id !== userId) {
			// can only delete own account
			return res.status(401).send('You can only delete your own account');
	}

	userService.delete(userId)
			.then(function () {
					res.sendStatus(200);
			})
			.catch(function (err) {
					res.status(400).send(err);
			});
});

module.exports = router;

/*
//Funciones
function validarAlfaNumerico(campo) {
	return ((!campo) && (!campo.match(/^[0-9a-z]+$/)) ? false : true;
}*/