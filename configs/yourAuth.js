// Renombra este archivo a "auth.js" y cambia las keys y secrets por los tuyos
// Generar app para social login con Google : https://console.developers.google.com
// Generar app para social login con Twitter : https://apps.twitter.com

var auths = {
	twitter : {
		key : 'your_key_from_twitter',
		secret : 'your_secret_from_twitter',
		callbackURL : '/auth/twitter/callback'
	},
	google : {
		client : 'your_client_from_google',
		secret : 'your_secret_from_google',
		callbackURL : '/auth/google/callback'
	}
};

module.exports = auths;