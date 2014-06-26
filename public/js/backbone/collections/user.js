Workspace.Collections.UserCollection = Backbone.Collection.extend({

	model : Workspace.Models.UserModel,
	
	initialize : function(){
		this.on('add', this.addListener);
		this.on('remove', this.removeListener);
	},

	addListener : function(model){
		var view = new Workspace.Views.UserView(model);
		view.render();
		view.$el.appendTo('#chat-users');
	},

	removeListener : function(model){
		$('#chat-users li#'+model.id).remove();
	}
});