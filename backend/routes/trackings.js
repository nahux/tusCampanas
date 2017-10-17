var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

var trackings = 
[{
	id: 0,
	id_campana: 0,
	title: "Crucero 10 días Brasil",
	sent: 35,
	opened: 5,
	errors: 2

}];

var trackingsById = 
[{
	id: 0,
	id_campana: 0,
	title: "Crucero 10 días Brasil",
	sent: 35,
	opened: 5,
	errors: 2

}];

router.get('/', function(req, res, next) {
	res.json(trackings);
});

router.get('/:id', function(req, res, next) {
	var id = req.params["id"];    
	var tracking = trackingsById[id];
	if (tracking) {
		res.json(tracking);
	} else {
		res.status(404).send("not found");
	}
});

router.post('/', function(req, res, next) {
	var tracking = req.body;
	tracking.id = uuid();
	trackings.push(tracking);
	trackingsById[tracking.id] = tracking;
	res.send(tracking);
});

module.exports = router;