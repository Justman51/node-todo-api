var mongoose = require('mongoose');

var users = mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
        
    }
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
