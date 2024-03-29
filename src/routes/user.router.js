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

const validateRequsestSchema = require('../middleware/validateRequestSchema');
const initializePassport = require('../middleware/passport');
const handleError = require("../middleware/errorHandler");
const userLoginAuthentication = require("../middleware/userLoginAuthentication")

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


router.post(`/`, userController.create);

router.get(`/:email`,userController.findByEmail);
router.put(`/:email`, userController.updateUserInfo);
router.delete(`/:email`,userLoginAuthentication.checkAuthenticated, userController.deleteByEmail);

router.put(`/me/updatePassword/`,userLoginAuthentication.checkAuthenticated,updatePasswordSchema, validateRequsestSchema, userController.updatePassword);
router.put(`/me/updateInfo/`, userLoginAuthentication.checkAuthenticated, updateUserInfoSchema, validateRequsestSchema, userController.updateInfo);
router.delete(`/me/deleteUser/`, userLoginAuthentication.checkAuthenticated, userController.deleteUser);
router.get(`/me/getInfo/`, userLoginAuthentication.checkAuthenticated, userController.getInfo);

router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);
router.post(`/login`,loginSchema, validateRequsestSchema, passport.authenticate('local'), userController.loginUser);
router.post(`/logout`,userLoginAuthentication.checkAuthenticated,userController.logOut);

router.use(handleError);

module.exports = router;
