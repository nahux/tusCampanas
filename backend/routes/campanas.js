var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

var campanas = [
								{
									id:1,
									title:"Crucero 10 días Brasil",
									desc:"Viaje en crucero de Buenos Aires a Rio de Janeiro", 
									grupos: 
										[{id:1}, {id:3}]
								}];
var campanasById = [{},
										{
											id:1,
											title:"Crucero 10 días Brasil",
											desc:"Viaje en crucero de Buenos Aires a Rio de Janeiro", 
											grupos: 
												[{id:1}, {id:3}]
										}];

router.put('/:id', function(req, res, next) {
	var updatedCampana = req.body;
	
	var id = req.params["id"];    
	var campana = campanasById[id];
	if (campana) {
			campana.title = updatedCampana.title;
			res.json(campana);
	} else {
			res.status(404).send("not found");
	}
});


router.get('/', function(req, res, next) {
	res.json(campanas);
});

router.get('/:id', function(req, res, next) {
	console.log(campanasById[0]);
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
	var campana = req.body;
	campana.id = uuid();
	campanas.push(campana);
	campanasById[campana.id] = campana;
	res.send(campana);
});

module.exports = router;
