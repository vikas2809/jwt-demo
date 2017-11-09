
var express= require('express');

var router=express.Router();

var userController=require('../controllers/userController');

router.route('/v1/user/create').post(userController.createUserDetails);

router.route('/v1/user/getAllUser').get(userController.getAllUser);

router.route('/v1/user/authenticateUser').post(userController.userAuthentication);

//saving the data into the userInfo collections
router.route('/v1/user/postInfo').post(userController.postUserInfoDetails);

//saving the data into the userEducation collections
router.route('/v1/user/postEducation').post(userController.postUserEducationDetails);

//get all info from all collection
router.route('/v1/user/getCompleteDetails').get(userController.getCompleteUserDetails);

router.route('/v1/user/:email')
.get(userController.getCompleteUserDetails);
module.exports=router;