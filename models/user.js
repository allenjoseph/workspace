var models = require('./models');
var Schema = models.Schema;

var UserSchema = new Schema({
    provider: String,
    profile_id: {type: String, unique: true},
    name: String,
    photo: String,
    createdAt: {type: Date, default: Date.now}
});

var User = models.model('user', UserSchema);

module.exports = User;