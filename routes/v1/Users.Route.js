const express = require('express');
const { verify } = require('jsonwebtoken');
const { verifyJWT } = require('../../middleware/verifyJWT');
const router = express.Router();

const UserController = require('./../../controllers/v1/Users.Controller');


router.route('/user/signup').post(UserController.signup);
router.route('/user/login').post(UserController.login);
router.route('/user/getMe').get(verifyJWT,UserController.getMe);


module.exports = router;