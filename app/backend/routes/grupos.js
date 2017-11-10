var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

var grupos = 
					[{id: 0,
						title: "Adultos", 
						desc: "Adultos, de 18 a 80 años", 
						clientes: [
									{id:2},
									{id:3}
						]
					 },
					 {
						id: 1,
						title: "Adultos La Plata", 
						desc: "Adultos de La Plata, de 18 a 80 años", 
						clientes: [
									{id:1}
						]
					}];

var gruposById = 
					[{id: 0,
						title: "Adultos", 
						desc: "Adultos, de 18 a 80 años", 
						clientes: [
									{id:2},
									{id:3}
						]
					 },
					 {
						id: 1,
						title: "Adultos La Plata", 
						desc: "Adultos de La Plata, de 18 a 80 años", 
						clientes: [
									{id:1}
						]
					}];

router.get('/', function(req, res, next) {
	res.json(grupos);
});

router.get('/:id', function(req, res, next) {
	var id = req.params["id"];    
	var grupo = gruposById[id];
	if (grupo) {
			res.json(grupo);
	} else {
			res.status(404).send("not found");
	}
});

router.put('/:id', function(req, res, next) {
	var updatedGrupo = req.body;
	
	var id = req.params["id"];    
	var grupo = grupos.find(x => x.id == id);
	if (grupo) {
		var index = grupos.indexOf(grupo); 
		grupos[index] = updatedGrupo;
		gruposById[grupo.id] = updatedGrupo;
		res.json(grupo);
	} else {
			res.status(404).send("not found");
	}
});

router.delete('/:id', function(req, res, next) {
	var id = req.params["id"];    
	var grupo = gruposById[id];
	
	if (grupo) {
			delete gruposById[id];
			grupos.splice(grupos.indexOf(grupo), 1)
			res.json(grupo);
	} else {
			res.status(404).send("not found");
	}
	
});


router.post('/', function(req, res, next) {
	var grupo = req.body;
	grupo.id = uuid();
	grupos.push(grupo);
	gruposById[grupo.id] = grupo;
	res.send(grupo);
});

module.exports = router;
