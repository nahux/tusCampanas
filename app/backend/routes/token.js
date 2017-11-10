var express = require('express');
var router = express.Router();
 
// make JWT token available to angular app
router.get('/', function (req, res) {
	res.send(req.session.token);
});

module.exports = router;