var User = require('../models/user'),
	ToDo = require('../models/todo'),
	_ = require('underscore');

var todoController = function(app,users){

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

	app.get('/todo', isNotLoggedIn, function(req, res){
		ToDo.find({})
		.exec(function(err, todos){
			var todosToJson = _.map(todos,function(todo){
				return todo.toJSON();
			});

			var content = {
				page : { module : 'ToDo' },
				user : req.session.passport.user,
				users : users,
				todos : todosToJson
			};

			res.render('todo', content);
		});
	});

	app.post('/todo/create-todo', isNotLoggedIn, getUser, function(req, res){
		var todo = new ToDo({
			task : req.body.task,
			user : req.user
		});

		todo.save(function(err){
			if(err){
				res.send(500,err);
			}

			app.io.broadcast('todo',{
				id : todo._id.valueOf(),
				task : todo.task,
				user : req.user.toJSON()
			});

			res.redirect('/todo');
		});
	});

	app.get('/todo/delete-todo/:id', isNotLoggedIn, function(req, res){

		ToDo.findByIdAndRemove(req.params.id).exec();

		res.redirect('/todo');
	});
};

module.exports = todoController;