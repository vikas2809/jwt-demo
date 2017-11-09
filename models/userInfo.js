//creating the schema of the user which are going to be registered the site

var mongoose = require('mongoose');


//defining the schema of the user table

var userInfo_schema=mongoose.Schema;
    var userInfoSchema=new userInfo_schema({
        email: { type: String, unique: true},
        address: { type: String},
        city: { type: String},
        landmark: { type: String},
        state: { type: String},
        country: {type:String},
        pincode: {type:Number},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var UserInfo = mongoose.model('userInfo',userInfoSchema);

    module.exports=UserInfo;