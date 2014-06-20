var models = require('./models'),
	Schema = models.Schema;

var ToDoSchema = new Schema({
	task : String,
	complete : { type : Boolean, default : false },
	user : {
		type : Schema.Types.ObjectId,
		ref : 'user'
	}
});

var ToDo = models.model('todo', ToDoSchema);

module.exports = ToDo;