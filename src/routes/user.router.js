const express = require("express");
const passport = require("passport")
const session = require("express-session")

const { check, validationResult } = require("express-validator");

const userController = require("../modules/user/controller/user.controller");
const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');
const validateRequsestSchema = require('../middleware/validateRequestSchema');

const initializePassport = require('../middleware/passport');
const { application } = require("express");
initializePassport(passport, 
    email =>
    userController.findByEmail(email)
)

const router = express.Router();

router.use(session({
    secret: 'YUNG_BEEF',
    resave: false,
    saveUninitialized: false,
}))

router.use(passport.initialize())
router.use(passport.session())

router.post(`/`, userController.create);

router.get(`/:email`, userController.findByEmail);
router.put(`/:email`, userController.updateUserInfo);
router.delete(`/:email`, userController.deleteByEmail);

router.post(`/login`,loginSchema, validateRequsestSchema, passport.authenticate('local'));
router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);

module.exports = router;
