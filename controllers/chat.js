var User = require('../models/user'),
	Post = require('../models/post'),
	_ = require('underscore');

var homeController = function(app, users){

	var isNotLoggedIn = function(req, res, next){
		if(!req.session.passport.user){
			res.redirect('/');
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

	app.get('/chat', isNotLoggedIn, function(req, res) {
		Post.find({})
		.populate('user')
		.exec(function(err, posts){
			var postsAsJson = _.map(posts,function(post){
				return post.toJSON();
			});

			var content = { 
				page : { module : 'Chat' }, 
				user : req.session.passport.user,
				users : users,
				posts : postsAsJson 
			};
			res.render('chat', content );
		});		
	});

	app.post('/chat/create-post',isNotLoggedIn, getUser, function(req,res){
		var post = new Post({
			content : req.body.content,
			user : req.user
		});

		post.save(function(err){
			if(err){
				res.send(500, err);
			}

			app.io.broadcast('post', {
				id : post._id.valueOf(),
				content : post.content,
				user : req.user.toJSON()
			});

			res.redirect('/chat');
		});
	});
};

module.exports = homeController;