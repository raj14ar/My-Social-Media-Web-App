const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to Database"));

db.once('open',function(){
    console.log('Connected to Database');
})

module.exports = db;