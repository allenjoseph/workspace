var express = require('express.io'),
    passport = require('passport'); 
    swig = require('swig');

var RedisStore = require('connect-redis')(express);

var app = express();
app.http().io();

var users = [];

/* CONFIGURACION DE LAS VISTAS */
app.engine( 'html', swig.renderFile );
app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );  

/* CONFIGURACION DEL SERVER */
app.configure(function(){
    app.use( express.static(__dirname + '/public') );

    app.use( express.cookieParser() );
    app.use( express.json() );
    app.use( express.urlencoded() );
    app.use( express.methodOverride() );

    app.use( express.session({ 
        secret: 'S3CR3T',
        store : new RedisStore({})
    }));
    app.use( passport.initialize() );
    app.use( passport.session() );

    app.use( app.router );  
})

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

/* Controllers ===================================*/
var homeController = require('./controllers/home');
var connectionsController = require('./controllers/connections');

homeController(app, users);
connectionsController(app);

/* Connections ===================================*/
var googleConnection = require('./connections/google');
var twitterConnection = require('./connections/twitter');

googleConnection(app);
twitterConnection(app);

/* ===============================================*/

app.listen(3000,function(){
    console.log("Workspace running on port : 3000");
});