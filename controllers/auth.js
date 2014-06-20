var passport = require('passport');

var authController = function(app){
	
	// Ruta para autenticarse TWITTER
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/log-in',
		failureRedirect: '/'
	}));

	// Ruta para autenticarse GOOGLE
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.me',
	           	'https://www.googleapis.com/auth/userinfo.email'] 
	}));
	app.get('/auth/google/return', passport.authenticate('google', {
		successRedirect: '/log-in',
		failureRedirect: '/'
	}));
};

module.exports = authController;