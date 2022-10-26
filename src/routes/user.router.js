const express = require("express");

const { check, validationResult } = require("express-validator");

const userController = require("../modules/user/controller/user.controller");

const router = express.Router();

router.post(`/`, userController.create);

router.get(`/:email`, userController.findByEmail);
router.put(`/:email`, userController.updateUserInfo);
router.delete(`/:email`, userController.deleteByEmail);

router.post(`/login`, userController.loginUser);
router.post(`/register`,userController.registerUser);

module.exports = router;
