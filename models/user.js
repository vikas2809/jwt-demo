//creating the schema of the user which are going to be registered the site

var mongoose = require('mongoose');


//defining the schema of the user table

var user_schema=mongoose.Schema;
    var userSchema=new user_schema({
        firstName: {type:String},
        lastName: {type:String},
        password: {type:String},
        phone_number: {type:Number, unique: true},
        email: { type: String, unique: true},
        role: { type: String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var User = mongoose.model('user',userSchema);

    module.exports=User;