const { check } = require("express-validator");

const loginSchema = [check('email').notEmpty().withMessage("Email field can't be empty").isEmail().withMessage("Email field must have an email structure").normalizeEmail(),
                     check('password').notEmpty().withMessage("Password field can't be empty").trim().isLength({min:8}).whitelist(/^[ A-Za-z0-9_@./#&+-]+$/)
];

module.exports = loginSchema; 