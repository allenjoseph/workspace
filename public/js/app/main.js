$(document).ready(function(){
	
	/* INIT SOCKET IO */
	window.io = io.connect();
	io.on('connect', function(socket){console.log('IO connected');});

	/* ---------------------------------------------------------------- */
	window.collections.users = new Workspace.Collections.UserCollection();
	window.collections.todos = new Workspace.Collections.ToDoCollection();
	window.collections.posts = new Workspace.Collections.PostCollection();
	window.routers.base = new Workspace.Routers.BaseRouter();

	var view = new Workspace.Views.MainView();
	view.render();
	/* ---------------------------------------------------------------- */
	$('#nav-button-chat').on('click', function(){
		Backbone.history.navigate('chat', { trigger : true });
	});
	$('#nav-button-todo').on('click', function(){
		Backbone.history.navigate('todo', { trigger : true });
	});

	/* ---------------------------------------------------------------- */
	var xhr_user = $.get('/users');
	xhr_user.done(function(data){
		if(data.users.length != 0){
			$.each(data.users, function(index, item){
				window.collections.users.add(item);
			});
		}
	});

	/* ---------------------------------------------------------------- */
	io.on('log-in', function(data){
		window.collections.users.add(data.user);
	});
	io.on('log-out', function(data){
		var user = window.collections.users.get(data.userid);
		window.collections.users.remove(user);
	});
	io.on('post', function(data){
		window.collections.posts.add(data.post);
	});

	/* ---------------------------------------------------------------- */
	Backbone.history.start({
		root : "/",
		pushState : true,
		silent : false
	});
});