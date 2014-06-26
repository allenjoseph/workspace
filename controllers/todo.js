var User = require('../models/user'),
	ToDo = require('../models/todo'),
	_ = require('underscore');

var todoController = function(app){

	var isNotLoggedIn = function(req, res, next){
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	};

	var getUser = function (req, res, next){
		User.findOne({_id: req.session.passport.user._id}, function(err,user){
			req.user = user;
			next();
		});
	};

	app.post('/todo/create', isNotLoggedIn, getUser, function(req, res){
		var todo = new ToDo({
			task : req.body.task,
			user : req.user
		});

		todo.save(function(err,todo){
			if(err){
				res.send({ 'success' : false });
			}
			res.send({ 
				'success' : true,
				todo : todo.toJSON() 
			});
		});
	});

	app.post('/todo/delete/:id', isNotLoggedIn, function(req, res){
		ToDo.findByIdAndRemove(req.params.id)
		.exec(function(err){
			if(err){
				res.send({ 'success' : false });
			}
			res.send({ 'success' : true });
		});
	});

	app.post('/todo/complete/:id', isNotLoggedIn, function(req, res){
		ToDo.findByIdAndUpdate(req.params.id, { $set : { complete : true } })
		.exec(function(err){
			if(err){
				res.send({ 'success' : false });
			}
			res.send({ 'success' : true });
		});		
	});

	app.post('/todo/incomplete/:id', isNotLoggedIn, function(req, res){
		ToDo.findByIdAndUpdate(req.params.id, { $set : { complete : false } })
		.exec(function(err){
			if(err){
				res.send({ 'success' : false });
			}
			res.send({ 'success' : true });
		});	
	});
};

module.exports = todoController;