var models = require('./models');
var Schema = models.Schema;

var UserSchema = new Schema({
    provider_id: { type: String, unique: true },
    provider: String,
    name: String,
    photo: String,
    online : { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

var User = models.model('user', UserSchema);

module.exports = User;