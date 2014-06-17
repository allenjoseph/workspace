var passport = require('passport'),
    config = require('../configurations/connection'),
    User = require('../models/user'),
    TwitterStrategy = require('passport-twitter').Strategy;

var twitterConnection = function(app){

    // Configuración del autenticado con Twitter
    passport.use(new TwitterStrategy({
        
        consumerKey: config.twitter.key,
        consumerSecret: config.twitter.secret,
        callbackURL: config.twitter.callbackURL

    }, function(accessToken, refreshToken, profile, done) {

        //Buscamos al usuario en nuestra base
        User.findOne({profile_id: profile.id}, function(err, user) {

            if(err) throw(err);

            //si ya tenemos al usuario lo devolvemos
            if(!err && user!= null) return done(null, user);

            //creamos el nuevo usuario
            var user = new User({
                profile_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });

            //guardamos el usuario en base y lo devolvemos
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
};

module.exports = twitterConnection;