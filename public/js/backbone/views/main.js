Workspace.Views.MainView = Backbone.View.extend({
	el : '#page-wrapper',

	events : {
		'click #todo-form-button' : 'addTodo',
		'click #post-form-button' : 'addPost'
	},

	initialize : function(){
		var self = this;
		window.routers.base.on('route:home', function(){
			self.render();
		});
		window.routers.base.on('route:todo', function(){
			self.render();
		});
		window.routers.base.on('route:chat', function(){
			self.render();
		});

		this.template_todo = _.template( $('#todo-main-template').html() );
		this.template_chat = _.template( $('#chat-main-template').html() );
	},

	addTodo : function(e){
		e.preventDefault();
		var self = this;
		var form = $('#todo-form').serialize();
		$.post('/todo/create', form, function(data){
			if(data.success){
				window.collections.todos.add(data.todo);
				self.$el.find('#todo-form-task').val("");
			}
		});
	},

	addPost :  function(e){
		e.preventDefault();
		var self = this;
		var form = $('#post-form').serialize();
		$.post('/chat/create-post', form, function(data){
			if(data.success){
				window.collections.posts.add(data.post);
				self.$el.find('#post-form-msg').val("");
			}
		});
	},

	render : function(){
		if(window.app.state === "todo"){
			this.$el.find('#page-header h1').html('ToDo');
			this.$el.find('#page-main').html( this.template_todo() );

			var xhr_todo = $.get('/todos', function(data){
				$.each(data.todos, function(index, item){
					window.collections.todos.add(item);
				});
			});
		}else if(window.app.state === "chat"){
			this.$el.find('#page-header h1').html('Chat');
			this.$el.find('#page-main').html( this.template_chat() );
		}
		else{
			this.$el.find('#page-header h1').html('Home');
		}
		return this;
	}

});