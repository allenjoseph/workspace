Workspace.Views.ToDoView = Backbone.View.extend({
	tagName : 'li',

	className : 'task-li',

	template : _.template( $('#todo-template').html() ),

	events : {
		'click .todo-delete' : 'deleteToDo',
		'change input[type=checkbox]' : 'changeToDo'
	},

	initialize : function(model){
		var self = this;
		this.model = model;

		this.model.on('change', function(){
			self.render();
		});
	},

	render : function(){
		var todo = this.model.toJSON();

		this.$el.attr( 'id', todo._id );
		this.$el.html( this.template( { todo : todo	} ) );

		return this;
	},

	changeToDo : function(){
		var self = this;
		var checkbox = this.$el.find('input[type=checkbox]');
		if(checkbox.is(':checked')){
			$.post('/todo/complete/'+this.model.id, function(data){
				if(data.success){
					self.$el.find('span.save').show().delay(1000).fadeOut();
				}
			});
		}else{
			$.post('/todo/incomplete/'+this.model.id, function(data){
				if(data.success){
					self.$el.find('span.save').show().delay(1000).fadeOut();
				}
			});
		}
	},

	deleteToDo : function(){
		var self = this;
		var xhr = $.post('/todo/delete/'+self.model.id);
		xhr.done(function(data){
			if(data.success){
				window.collections.todos.remove(self.model);				
			}
		});
	}

});