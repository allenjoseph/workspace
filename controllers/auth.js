var passport = require('passport');

var authController = function(app){
	
	// Ruta para autenticarse TWITTER
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));

	// Ruta para autenticarse GOOGLE
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.me',
	           	'https://www.googleapis.com/auth/userinfo.email'] 
	}));
	app.get('/auth/google/return', passport.authenticate('google', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));
};

module.exports = authController;