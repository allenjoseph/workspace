Workspace.Views.UserView = Backbone.View.extend({
	tagName : 'li',
	
	className : 'user-li',

	template : _.template( $('#user-template').html() ),

	initialize : function(model){
		var self = this;
		this.model = model;

		this.model.on('change', function(){
			self.render();
		});
	},

	render : function(data){
		var user = this.model.toJSON();
		
		this.$el.attr( 'id', user._id );
		this.$el.html( this.template( { user : user	} ) );

		return this;
	}
});