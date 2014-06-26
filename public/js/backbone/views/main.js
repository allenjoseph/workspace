Workspace.Views.MainView = Backbone.View.extend({
	el : '#page-wrapper',

	events : {
		'click #todo-form-button' : 'addTodo'
	},

	initialize : function(){
		var self = this;
		window.routers.base.on('route:home', function(){
			self.render();
		});
		window.routers.base.on('route:todo', function(){
			self.render();
		});

		this.template_todo = _.template( $('#todo-main-template').html() );
	},

	addTodo : function(){
		var self = this;
		var form = $('#todo-form').serialize();
		$.post('/todo/create', form, function(data){
			if(data.success){
				window.collections.todos.add(data.todo);
				self.$el.find('#todo-form-task').val("");
			}
		});
	},

	render : function(){
		if(window.app.state === "todo"){
			this.$el.find('#page-header h1').html('ToDo');
			this.$el.find('#page-main').html( this.template_todo () );

			var xhr_todo = $.get('/todos', function(data){
				data.todos.forEach(function(item){
					window.collections.todos.add(item);
				});
			});

		}else{
			this.$el.find('#page-header h1').html('Home');
		}
		return this;
	}

});