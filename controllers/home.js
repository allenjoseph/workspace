var _ = require('underscore');

var homeController = function(app, users){

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

	app.get('/', isLoggedIn, function(req, res) {
		var content = { 
			page : { module : 'Welcome' }, 
			user : null 
		};
		res.render('index', content );
	});

	app.get('/log-in', function(req,res){
		users.push( req.session.passport.user );
		app.io.broadcast('log-in',{ 			
			userid : req.session.passport.user.profile_id,
			username : req.session.passport.user.name
		});

		res.redirect('/home');
	});

	app.get('/log-out', function(req, res) {
		users = _.without( users, req.session.passport.user );
		app.io.broadcast('log-out',{ 			
			userid : req.session.passport.user.profile_id
		});

		req.session.destroy();
		res.redirect('/');
	});

	app.get('/home', isNotLoggedIn, function(req, res) {		
		var content = { 
			page : { module : 'Home' }, 
			user : req.session.passport.user,
			users : users 
		};
		res.render('index', content );
	});

	app.get('/chat', isNotLoggedIn, function(req, res) {
		var content = { 
			page : { module : 'Chat' }, 
			user : req.session.passport.user,
			users : users 
		};
		res.render('chat', content );
	});
};

module.exports = homeController;