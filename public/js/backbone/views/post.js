Workspace.Views.PostView = Backbone.View.extend({
	tagName : 'li',

	className : 'post-li',

	template : _.template( $('#post-template').html() ),

	initialize : function(model){
		var self = this;
		this.model = model;
	},

	render : function(){
		var post = this.model.toJSON();
		
		this.$el.html( this.template( { post : post	} ) );

		return this;
	}
});