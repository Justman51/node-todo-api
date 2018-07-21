var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;


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





//console.log('Just testing');



app.listen(port, ()=> {
  console.log('Started on port 3000');
})