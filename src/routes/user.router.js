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
const resetPasswordSchema = require("../schemas/resetPasswordSchema");
const uploadFileSchema = require("../schemas/uploadFileSchema");

const validateRequsestSchema = require('../middleware/validateRequestSchema');
const initializePassport = require('../middleware/passport');
const handleError = require("../middleware/errorHandler");
const userAuthentication = require("../middleware/userAuthentication");


const router = express.Router();

initializePassport(passport, 
    email =>
    userService.findByEmail(email)
)

router.use(passport.initialize());


router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);
router.post(`/login`,loginSchema, validateRequsestSchema, passport.authenticate('local'), userController.loginUser);
router.post('/resetForgottenPassword/sendMail',emailInputSchema, validateRequsestSchema, userController.resetForgottenPasswordEmail);
router.post('/resetForgottenPassword/resetPassword',resetPasswordSchema, validateRequsestSchema,userController.resetPassword);

router.use(userAuthentication.checkAuthenticated, userAuthentication.checkBlocked);

router.get(`/me/getInfo/`, userController.getInfo);
router.get(`/me/getAchievements/`, userController.getAchievements);
router.get(`/me/getProfileImage/`, userController.getProfileImage);
router.put(`/me/updatePassword/`,updatePasswordSchema, validateRequsestSchema, userController.updatePassword);
router.put(`/me/updateInfo/`, updateUserInfoSchema, validateRequsestSchema, userController.updateInfo);
router.put(`/me/uploadProfileImage/`, uploadFileSchema, validateRequsestSchema, userController.uploadProfileImage);
router.delete(`/me/deleteUser/`, userController.deleteUser);
router.post(`/logout`,userController.logOut);

router.use(userAuthentication.checkAdmin);

router.get(`/admin/getAllUsers/`,  userController.getAllUsers);
router.get(`/admin/getAllUsers/count`, userController.countAllUsers), 
router.get(`/admin/getUser/:email/`, userController.findByEmail);
router.put(`/admin/updateUser/:email/`, userController.updateUser);

router.use(handleError);

module.exports = router;