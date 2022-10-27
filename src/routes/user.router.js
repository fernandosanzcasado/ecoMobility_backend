const express = require("express");

const { check, validationResult } = require("express-validator");

const userController = require("../modules/user/controller/user.controller");
const validateRequsestSchema = require('../middleware/validateRequestSchema');
const registerSchema = require('../schemas/registerSchema');
const loginSchema = require('../schemas/loginSchema');

const router = express.Router();

router.post(`/`, userController.create);

router.get(`/:email`, userController.findByEmail);
router.put(`/:email`, userController.updateUserInfo);
router.delete(`/:email`, userController.deleteByEmail);

router.post(`/login`,loginSchema, validateRequsestSchema, userController.loginUser);
router.post(`/register`,registerSchema,validateRequsestSchema,userController.registerUser);

module.exports = router;
