var User = require('../models/user'),
	ToDo = require('../models/todo'),
	_ = require('underscore');	

var dataController = function(app){

	var isNotLoggedIn = function(req, res, next){
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	};

	app.get('/users', isNotLoggedIn, function(req, res){
		User.find({ online : true })
		.exec(function(err,users){
			usersToJson = _.map(users,function(user){
				return user.toJSON();
			});
			
			res.send({
				users : usersToJson
			});
		});
	});

	app.get('/todos', isNotLoggedIn, function(req, res){
		ToDo.find({ 'user' : req.session.passport.user._id })
		.populate('user')
		.exec(function(err, todos){
			var todosToJson = _.map(todos,function(todo){
				return todo.toJSON();
			});

			res.send({
				todos : todosToJson
			});
		});
	});

};

module.exports = dataController;