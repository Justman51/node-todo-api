require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

var app = express();
var port = process.env.PORT;


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });



app.post('/todos', (req, res)=> {
    var todo = new Todo({
      text:req.body.text,
      completed: true,
      completedAt: 1  
    });
    todo.save().then((doc)=> {
          res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

// Create User on Mongo database
app.post('/users', (req, res) => { 
  var body = _.pick(req.body, ['email', 'password']); // set what can be updated
  var user = new User({
    email: body.email,
    password: body.password,
  });

  
  user.save().then(() => {
   return user.generateAuthToken();
   // res.send(doc);
  }).then((token)=> {
    res.header('x-auth', token).send(user)
  }).catch((e)=> {
    res.status(400).send(e)
  })
})

app.get('/todos', (req, res) => {
  var allTodos = Todo.find().then((todos) => {
        res.send({
          todos
        })
  }, (e)=> {
        res.status(400).send(e);
  });

});

app.get('/todos/:id', (req, res)=> {
   var id = req.params.id;
   if(!ObjectID.isValid(id)) {
     return res.status(404).send();
   }
  
   var todo = Todo.findById(id)
   .then((todo) => {
     if(!todo) {
      return res.status(404).send();
     }
     res.send({
       todo
     });
  })
  .catch((e) => {
    res.status(400).send(e);
  });

});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id; //this is how we catch the id parameter
   if(!ObjectID.isValid(id)) {
     return res.status(404).send();
   }
 var todo = Todo.findByIdAndRemove({ _id: id})
.then((todo) => {
  if(!todo) {
    return res.status(404).send();
   }
   res.send({
     todo
   });
})
.catch((e) => {
  console.log(e)
});

});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); // set what can be updated
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
  }else {
     body.completed = false;
     body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => {
     if(!todo) {
      return res.status(404).send();
     }
     res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});

//console.log('Just testing');



app.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});


module.exports =  {
  app
}