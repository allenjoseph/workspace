Workspace.Collections.PostCollection = Backbone.Collection.extend({
	
	model : Workspace.Models.PostModel,

	initialize : function(){
		this.on('add', this.addListener);
	},

	addListener : function(model){
		var view = new Workspace.Views.PostView(model);
		view.render();
		view.$el.appendTo('#chat-posts');
	}
});