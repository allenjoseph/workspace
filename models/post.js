var models = require('./models');
var Schema = models.Schema;

var PostSchema = new Schema({
    content: String,
    user : {
    	type : Schema.Types.ObjectId,
    	ref : 'user'
    }
});

var Post = models.model('post', PostSchema);

module.exports = Post;