var passport = require('passport'),
	configAuth = require('../configs/auth'),
	User = require('../models/user'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var googleConnection = function(app){

	// Configuración del autenticado con Google
    passport.use(new GoogleStrategy({

        clientID: configAuth.google.client,
        clientSecret: configAuth.google.secret,
        callbackURL: configAuth.google.callbackURL
        
      }, function(accessToken, refreshToken, profile, done) {
        //Buscamos al usuario en nuestra base
        User.findOne({ provider_id : profile.id, provider : profile.provider  }, function(err, user) {            
            if(err) throw(err);
            //si ya tenemos al usuario lo devolvemos
            if(!err && user!= null){
                return done(null, user);
            }

            //creamos el nuevo usuario
            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
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