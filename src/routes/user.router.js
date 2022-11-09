const express = require("express");
const passport = require("passport")
const session = require("express-session")
const { check, validationResult } = require("express-validator");
const { application } = require("express");

const userController = require("../modules/user/controller/user.controller");
const userService = require("../modules/user/service/user.service")
const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');
const validateRequsestSchema = require('../middleware/validateRequestSchema');


const initializePassport = require('../middleware/passport');

initializePassport(passport, 
    email =>
    userService.findByEmail(email)
)

const router = express.Router();

router.use(session({
    secret: 'YUNG_BEEF',
    resave: false,
    saveUninitialized: false,
}))

function handleError(err, req, res, next) {
    if (err) {
    res.status(err.status).json(err.message);
    }
    else {
        next();
    }
}

router.use(passport.initialize())
router.use(passport.session())

router.post(`/`, userController.create);

router.get(`/:email`, userController.findByEmail);
router.put(`/:email`, userController.updateUserInfo);
router.delete(`/:email`, userController.deleteByEmail);

router.post(`/login`,loginSchema, validateRequsestSchema, passport.authenticate('local'), userController.loginUser);
router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);

router.use(handleError)

module.exports = router;
