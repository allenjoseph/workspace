Workspace.Models.UserModel = Backbone.Model.extend({
	initialize : function(model){
		this.set('id', model._id);
	}
});