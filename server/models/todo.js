var mongoose = require('mongoose');

var kittySchema = mongoose.Schema( { 
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
      completed: {
         type: Boolean,
         default: false
      },
      completedAt: {
         type: Number,
         default: null
      }
});

var Todo = mongoose.model('Todo', kittySchema);

// var newTodo = new Todo({
//     text: 'Buy Fruits',
//     completed: false,
//    completedAt: 123
// });

// newTodo.save().then((doc)=> {
//     console.log('Saved todo', doc);
// }, (e)=> {
//   console.log('Unable to save todo', e);
// });

module.exports.Todo = Todo;