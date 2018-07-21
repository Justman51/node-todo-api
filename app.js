// getting-started.js
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/TodoApp');
mongoose.connect('mongodb://localhost:27017/TodoApp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var kittySchema = mongoose.Schema( { 
    text: {
        type: String
      },
      completed: {
         type: Boolean
      },
      completedAt: {
         type: Number
      }
});

var Todo = mongoose.model('Todo', kittySchema);

var newTodo = new Todo({
    text: 'Cook dinner',
    completed: false
});

newTodo.save().then((doc)=> {
      console.log('Saved todo', doc);
}, (e)=> {
    console.log('Unable to save todo', e);
});

console.log('Just testing');