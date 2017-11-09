//creating the schema of the user which are going to be registered the site

var mongoose = require('mongoose');


//defining the schema of the user table

var userEducation_schema=mongoose.Schema;
    var userEducationSchema=new userEducation_schema({
        email: { type: String, unique: true},
        highest_education: { type: String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var UserEducation = mongoose.model('userEducation',userEducationSchema);

    module.exports=UserEducation;