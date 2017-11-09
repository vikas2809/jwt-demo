
//importing the user model from the models

var User =require('../models/user');
var UserInfo = require('../models/userInfo');
var UserEducation = require('../models/userEducation');
var jwt = require('jsonwebtoken');
var express= require('express');
var app=express();
app.set('superSecret','serverToken');

exports.createUserDetails=(request,response)=>{
    var user=new User({
        firstName:  request.body.firstName,
        lastName:   request.body.lastName,
        password:   request.body.password,
        phone_number: request.body.phone_number,
        email:      request.body.email,
        role:       request.body.role,
        created_at:new Date(),
        updated_at:request.body.updated_at
    });
    //creating the user document in the collections
    user.save((error,res)=>{
        if(error)
        return error;
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//requesting for all the user details
exports.getAllUser=(req,res)=>{
    User.find( {},(error,response)=>{
        if(error)
            res.json({
                "status": "empty",
                "error": "404 Page Not Found"
            });
        // res.json(response);
        res.json({
            "status": true,
            "respData": {
                 response
            }
        }
        )
    });
}


//requesting for authenticat the user requesting for the login access in the website
exports.userAuthentication=(req,res)=>{
    User.findOne({
        email: req.body.email
      }, function(err, user) {
    
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          role: user.role
        };
            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn: 3600 // expires in 24 hours
            });
    
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              respData:user,
              token: token
            });
          }
    
        }
    
      });
}

//first save the all data into the userInfo table
exports.postUserInfoDetails=(request,response)=>{
    var userInfo=new UserInfo({
        email       :      request.body.email,
        address     :      request.body.address,
        city        :      request.body.city,
        landmark    :      request.body.landmark,
        state       :      request.body.state,
        country     :      request.body.country,
        pincode     :      request.body.pincode,
        created_at  :      new Date(),
        updated_at  :      request.body.updated_at
    });
    //creating the user document in the collections
    userInfo.save((error,res)=>{
        if(error)
        return error;
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}


//saving the user's education data in the userEducation collection\
exports.postUserEducationDetails=(request,response) => {
    var userEducation=new UserEducation({
        email            :      request.body.email,
        highest_education:      request.body.highest_education,
        created_at       :      new Date(),
        updated_at       :      request.body.updated_at
        
    });
    //creating the user document in the collections
    userEducation.save((error,res)=>{
        if(error)
        return error;
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//collecting all info from the all table trying to get into in one table
//user of promise to get the data in an array
// exports.getCompleteUserDetails=(req,res)=>{
//     console.log("inside userDetails");
//     User.find({}).exec().then(function(user){
//         console.log("inside user");
//         var addressArray = [];
//         console.log(user);
//         return UserInfo.find({}).exec()
//     }).then(function(info){
//         if(info.email==user.email){
//             console.log("user");
//             addressArray.push(info);
//             console.log(addressArray);
//             return res.json("Check Log");
//         }
//     }).then(function(){
//         var educationArray= [];
//         return UserEducation.find({}).exec()
//     }).then(function(education){
//         if(education.email==user.email){
//             console.log("education");
//             educationArray.push(education);
//             console.log(educationArray);
//         }
//     }).catch(function(err){
//         res.json(err);
//     })
// }




exports.getCompleteUserDetails = (req,res) => {
    var email=req.params.email;
    User.findOne({email:email}).exec()
    .then(function(user){
        var result = [];
        return UserInfo.findOne({email:user.email}).exec()
        .then(function(userInfo){
            return [user,userInfo];
        })
    }).then(function(result){
        var userDetail=result[1];
        return UserEducation.find({email:userDetail.email}).exec()
        .then(function(userEducation){
            result.push(userEducation);
            return result;
        })
    }).then(function(result){
        var user=result[0];
        var userInfo=result[1];
        var userEducation =result[2][0];
        var body = {email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: user.password,
                    phone_number: user.phone_number,
                    role: user.role,
                    address: userInfo.address,
                    city: userInfo.city,
                    landmark: userInfo.landmark,
                    state: userInfo.state,
                    country: userInfo.country,
                    pincode: userInfo.pincode,
                    education: userEducation.highest_education            
        }
        res.json({
            success: true,
            data:body
        })
    })
}


//requesting for all the user details
exports.getAllUser=(req,res)=>{
    User.find( {},(error,response)=>{
        if(error)
            res.json({
                "status": "empty",
                "error": "404 Page Not Found"
            });
        // res.json(response);
        res.json({
            "status": true,
            "respData": {
                 response
            }
        }
        )
    });
}