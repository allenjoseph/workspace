var User = require('../models/user'),
	Post = require('../models/post'),
	_ = require('underscore');

var homeController = function(app){

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

	app.post('/chat/create-post',isNotLoggedIn, getUser, function(req,res){
		var post = new Post({
			content : req.body.content,
			user : req.user
		});

		post.save(function(err, post){
			if(err){
				res.send({ 'success' : false });
			}

			Post.findById( post._id )
			.populate('user')
			.exec(function(err, post){
				app.io.broadcast('post', {
					post : post.toJSON()
				});

				res.send({ 
					'success' : true,
					post : post.toJSON() 
				});			
			});
		});		
	});
};

module.exports = homeController;