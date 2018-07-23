var mongoose = require('mongoose');
var validator = require('validator');
 
validator.isEmail('foo@bar.com'); //=> true

var users = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User phone number required'],
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
               return validator.isEmail(v)
              //return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
          }

        
    },
    password: {
     type: String,
     required: [true, 'User password is required'],
     minlength: 6
    },
    tokens: [{
     access: {
      type:String,
      required: true
     },
     token: {
         type: String,
         required: true
   
     }
    }]
});

var User = mongoose.model('User', users);


module.exports.User = User;
// var newUser = new User({
//   email: 'johnDoe@example.com'  
// });



// newUser.save().then((val) => {
//    console.log('Saved a user', val);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });
