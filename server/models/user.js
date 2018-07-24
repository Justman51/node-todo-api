var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// var data = {
//     id: 10
// }

// jwt.sign
// jwt.verify

 
validator.isEmail('foo@bar.com'); //=> true

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User email required'],
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
               return validator.isEmail(v)
              //return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid Email!'
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

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123');
    
   user.tokens = user.tokens.concat([{access, token}])
      // OR
    // user.tokens.push({
    //     access,
    //     token
    // });

    user.save().then(()=> {
        return token;
    })
};


UserSchema.statics.findByToken = function(token) {
     var User = this;
     var decoded;

     try {
       decoded =  jwt.verify(token, 'abc123');

     } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        return Promise.reject();
     }

     return User.findOne({
         '_id': decoded._id,
         'tokens.token': token,
         'token.access': 'auth'
     })
}

var User = mongoose.model('User', UserSchema);


module.exports.User = User;
// var newUser = new User({
//   email: 'johnDoe@example.com'  
// });



// newUser.save().then((val) => {
//    console.log('Saved a user', val);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });
