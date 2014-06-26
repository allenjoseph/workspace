$(document).ready(function(){
	
	/* INIT SOCKET IO */
	window.io = io.connect();
	io.on('connect', function(socket){console.log('IO connected');});

	/* ---------------------------------------------------------------- */
	window.collections.users = new Workspace.Collections.UserCollection();
	window.collections.todos = new Workspace.Collections.ToDoCollection();
	window.routers.base = new Workspace.Routers.BaseRouter();

	var view = new Workspace.Views.MainView();
	view.render();
	/* ---------------------------------------------------------------- */
	$('#nav-button-chat').on('click', function(){
		alert('Nothing yet');
	});
	$('#nav-button-todo').on('click', function(){
		Backbone.history.navigate('todo', { trigger : true });
	});

	/* ---------------------------------------------------------------- */
	var xhr_user = $.get('/users');
	xhr_user.done(function(data){
		data.users.forEach(function(item){
			window.collections.users.add(item);
		});
	});

	/* ---------------------------------------------------------------- */
	io.on('log-in', function(data){
		window.collections.users.add(data.user);
	});
	io.on('log-out', function(data){
		var user = window.collections.users.get(data.userid);
		window.collections.users.remove(user);
	});

	/* ---------------------------------------------------------------- */
	Backbone.history.start({
		root : "/",
		pushState : true,
		silent : false
	});
});