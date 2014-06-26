Workspace.Collections.ToDoCollection = Backbone.Collection.extend({
	
	model : Workspace.Models.ToDoModel,

	initialize : function(){
		this.on('add', this.addListener);
		this.on('remove', this.removeListener);
	},

	addListener : function(model){
		var view = new Workspace.Views.ToDoView(model);
		view.render();
		view.$el.appendTo('#todo-list');
	},

	removeListener : function(model){
		$('#todo-list li#'+model.id).remove();
	}
});