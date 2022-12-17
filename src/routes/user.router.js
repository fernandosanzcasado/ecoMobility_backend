const express = require("express");
const { application } = require("express");
const passport = require("passport");
const session = require("express-session");
const { check, validationResult } = require("express-validator");


const userController = require("../modules/user/controller/user.controller");
const userService = require("../modules/user/service/user.service")
const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');
const updatePasswordSchema = require('../schemas/updatePasswordSchema');
const updateUserInfoSchema = require('../schemas/updateUserInfoSchema');
const emailInputSchema = require('../schemas/emailInputSchema');

const validateRequsestSchema = require('../middleware/validateRequestSchema');
const initializePassport = require('../middleware/passport');
const handleError = require("../middleware/errorHandler");
const userAuthentication = require("../middleware/userAuthentication");
const resetPasswordSchema = require("../schemas/resetPasswordSchema");

const router = express.Router();

initializePassport(passport, 
    email =>
    userService.findByEmail(email)
)

router.use(session({
    secret: 'YUNG_BEEF',
    resave: false,
    saveUninitialized: false,
}))

router.use(passport.session());
router.use(passport.initialize());


router.get(`/admin/getAllUsers/`, userAuthentication.checkAuthenticated,userAuthentication.checkBlocked, userAuthentication.checkAdmin, userController.getAllUsers);
router.get(`/admin/getUser/:email/`, userAuthentication.checkAuthenticated, userAuthentication.checkAdmin, userController.findByEmail);
router.put(`/admin/updateUser/:email/`, userAuthentication.checkAuthenticated,userAuthentication.checkBlocked, userAuthentication.checkAdmin, userController.updateUser);


router.get(`/me/getInfo/`, userAuthentication.checkAuthenticated,userAuthentication.checkBlocked, userController.getInfo);
router.put(`/me/updatePassword/`,userAuthentication.checkAuthenticated,userAuthentication.checkBlocked,updatePasswordSchema, validateRequsestSchema, userController.updatePassword);
router.put(`/me/updateInfo/`, userAuthentication.checkAuthenticated,userAuthentication.checkBlocked, updateUserInfoSchema, validateRequsestSchema, userController.updateInfo);
router.delete(`/me/deleteUser/`, userAuthentication.checkAuthenticated,userAuthentication.checkBlocked, userController.deleteUser);


router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);
router.post(`/login`,loginSchema, validateRequsestSchema, passport.authenticate('local'),userAuthentication.checkBlocked, userController.loginUser);
router.post(`/logout`,userAuthentication.checkAuthenticated,userAuthentication.checkBlocked,userController.logOut);
router.post('/resetForgottenPassword/sendMail',emailInputSchema, validateRequsestSchema, userController.resetForgottenPasswordEmail);
router.post('/resetForgottenPassword/resetPassword',resetPasswordSchema, validateRequsestSchema,userController.resetPassword);

router.use(handleError);

module.exports = router;
