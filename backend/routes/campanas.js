var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

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
	var campana = req.body;
	campana.id = uuid();
	campanas.push(campana);
	campanasById[campana.id] = campana;
	res.send(campana);
});

module.exports = router;
