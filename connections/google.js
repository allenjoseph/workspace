var passport = require('passport'),
	config = require('../configurations/connection'),
	User = require('../models/user'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var googleConnection = function(app){

	// Configuración del autenticado con Google
    passport.use(new GoogleStrategy({

        clientID: config.google.client,
        clientSecret: config.google.secret,
        callbackURL: config.google.callbackURL
        
      }, function(accessToken, refreshToken, profile, done) {
        //Buscamos al usuario en nuestra base
        User.findOne({profile_id: profile.id}, function(err, user) {            
            if(err) throw(err);
            //si ya tenemos al usuario lo devolvemos
            if(!err && user!= null){
                return done(null, user);
            }

            //creamos el nuevo usuario
            var user = new User({
                provider: profile.provider,
                profile_id: profile.id,
                name: profile.name.givenName,
                photo: profile._json.picture + '?sz=45'
            });

            //guardamos el usuario en base y lo devolvemos
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
};

module.exports = googleConnection;