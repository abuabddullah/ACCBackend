const express = require('express');
const { verify } = require('jsonwebtoken');
const { verifyJWT } = require('../../middleware/verifyJWT');
const router = express.Router();

const UserController = require('./../../controllers/v1/Users.Controller');


router.route('/user/signup').post(UserController.signup);router.route('/user/signup/confirmation/:token').get(UserController.confirmEmail);
router.route('/user/login').post(UserController.login);


// inline verifyJWT middleware
router.route('/user/getMe').get(verifyJWT,UserController.getMe);

// alternative for using verifyJWT middleware
router.use(verifyJWT); // এই line এর power হচ্ছে এর নিচে যেই সব route declare করা হবে তার আগে অবশ্যই verfiJWT middlewear কে pass করে যেতে হবে।
// router.route('/user/getMe').get(UserController.getMe);





module.exports = router;