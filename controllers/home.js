var _ = require('underscore'),
	User = require('../models/user');

var homeController = function(app){

	var isNotLoggedIn = function(req, res, next){
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	};

	var isLoggedIn = function (req, res, next){
		if(req.session.passport.user){
			res.redirect('/home');
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

	app.get('/', isLoggedIn, function(req, res) {
		var content = { 
			page : { module : 'Welcome' }, 
			user : null 
		};
		res.render('index', content );
	});

	app.get('/home', isNotLoggedIn, function(req, res) {		
		//Update state of User
		User.findByIdAndUpdate( req.session.passport.user._id, { $set : { online : true }},	function(err, user){
			//Notify to all user logged
			app.io.broadcast('log-in',{ 			
				user : user.toJSON()
			});

			var content = { 
				page : { module : 'Home' }, 
				user : user.toJSON()
			};

			res.render('index', content );
		});
	});

	app.get('/log-out', function(req, res) {
		User.update( 
			{ _id : req.session.passport.user._id },
			{ $set : { online : false }}
		).exec();

		app.io.broadcast('log-out',{ 			
			userid : req.session.passport.user._id.valueOf()
		});

		req.session.destroy();
		res.redirect('/');
	});
};

module.exports = homeController;