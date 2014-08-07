var express = require('express.io'),
    passport = require('passport'); 
    swig = require('swig');

var RedisStore = require('connect-redis')(express);

var app = express();
app.http().io();

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
});

app.configure('development', function(){
	app.set('env', 'development');
});

app.configure('production', function(){
	app.set('env', 'production');
});

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

/* Controllers ------------------------------------*/
var authController = require('./controllers/auth');
var homeController = require('./controllers/home');
var dataController = require('./controllers/data');
var chatController = require('./controllers/chat');
var todoController = require('./controllers/todo');

authController(app);
homeController(app);
dataController(app);
chatController(app);
todoController(app);

/* Connections ------------------------------------*/
var googleAuth = require('./auths/google');
var twitterAuth = require('./auths/twitter');

googleAuth(app);
twitterAuth(app);

/*-------------------------------------------------*/

app.listen(3000,function(){
    console.log("Workspace running on port : 3000");
});