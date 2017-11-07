var config = require('../config.json');

var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('campanas');
 
var service = {};

service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;

function getCampanasUser(userid){
	var deferred = Q.defer();

	//Busco campañas de usuario
	db.campanas.find({ idUser: userid }).toArray(function(err, campanasUser) {
		if (err) deferred.reject(err);

		if(campanasUser) {
			//Retorno sus campañas
			deferred.resolve(campanasUser);
		} {
			//No hay campañas
			deferred.resolve();
		}
	});

	return deferred.promise;
}

function getById(_id) {
	var deferred = Q.defer();

	db.campanas.findById(_id, function (err, campana) {
		if (err) deferred.reject(err);

		if (campana) {
			//Retorno campaña
			deferred.resolve(campana);
		} else {
			//Campaña no encontrada
			deferred.resolve();
		}
	});

	return deferred.promise;
}
 
function create(campana) {
	var deferred = Q.defer();

	//Inserto campaña en la base
	db.campanas.insert(
		campana,
		function (err, doc) {
			if (err) deferred.reject(err);

			deferred.resolve();
	});

	return deferred.promise;
}
 
function update(_id, userParam) {
	var deferred = Q.defer();

	// validation
	db.users.findById(_id, function (err, user) {
		if (err) deferred.reject(err);

		if (user.username !== userParam.username) {
				// username has changed so check if the new username is already taken
				db.users.findOne(
						{ username: userParam.username },
						function (err, user) {
								if (err) deferred.reject(err);

								if (user) {
										// username already exists
										deferred.reject('Username "' + req.body.username + '" is already taken')
								} else {
										updateUser();
								}
						});
		} else {
				updateUser();
		}
	});

	function updateUser() {
		// fields to update
		var set = {
				firstName: userParam.firstName,
				lastName: userParam.lastName,
				email: userParam.email,
		};

		// update password if it was entered
		if (userParam.password) {
				set.hash = bcrypt.hashSync(userParam.password, 10);
		}

		db.users.update(
			{ _id: mongo.helper.toObjectID(_id) },
			{ $set: set },
			function (err, doc) {
					if (err) deferred.reject(err);

					deferred.resolve();
			});
	}

	return deferred.promise;
}
 
// prefixed function name with underscore because 'delete' is a reserved word in javascript
function _delete(_id) {
	var deferred = Q.defer();

	db.users.remove(
			{ _id: mongo.helper.toObjectID(_id) },
			function (err) {
					if (err) deferred.reject(err);

					deferred.resolve();
			});

	return deferred.promise;
}