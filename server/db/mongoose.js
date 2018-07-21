// getting-started.js
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/TodoApp');
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });


module.exports = {
    mongoose
} 