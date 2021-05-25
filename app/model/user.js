// DEFINING THE USER SCHEMA

// importing modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

// export userschema
 module.exports = mongoose.model("User", UserSchema);
