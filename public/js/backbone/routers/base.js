Workspace.Routers.BaseRouter = Backbone.Router.extend({
	routes : {
		'' : 'root',
		'home' : 'home',
		'chat' : 'chat',
		'todo' : 'todo'
	},

	root : function(){
		$('#page-header h1').html('Welcome');	
	},

	home : function(){
		window.app.state = "home"
	},

	chat : function(){
		window.app.state = "chat"
	},

	todo: function(){
		window.app.state = "todo"
	}
});