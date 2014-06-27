var User = require('../models/user'),
	ToDo = require('../models/todo'),
	_ = require('underscore');	

var dataController = function(app){

	app.get('/users', function(req, res){
		if(req.session.passport.user){
			User.find({ online : true })
			.exec(function(err,users){
				usersToJson = _.map(users,function(user){
					return user.toJSON();
				});
				
				res.send({
					users : usersToJson
				});
			});
		}else{
			res.send({
				users : {}
			});
		}
	});

	app.get('/todos', function(req, res){
		if(req.session.passport.user){
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
		}else{
			res.send({
				todos : {}
			});
		}
	});

};

module.exports = dataController;