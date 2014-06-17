var mongoose = require('mongoose');

// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://localhost:27017/workspace', function(err, res) {
    if(err) console.log('Error al conectar con la BD : ',err);;
    console.log('Conectado con éxito a la BD');
});

module.exports = mongoose;