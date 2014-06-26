Workspace.Models.ToDoModel = Backbone.Model.extend({
	initialize : function(model){
		this.set('id', model._id);
	}	
});