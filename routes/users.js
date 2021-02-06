const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signup',userController.signUp);
router.get('/signin',userController.signIn);
router.get('/post',userController.post);
router.post('/create',userController.create);
router.get('/signout',userController.destroySession);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
),userController.createSession);

module.exports = router;
