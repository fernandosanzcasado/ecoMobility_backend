const { check } = require("express-validator");

const loginSchema = [check('email').notEmpty().withMessage("Email field can't be empty").isEmail().withMessage("Email field must have an email structure").normalizeEmail(),
                     check('password').notEmpty().withMessage("Password field can't be empty"),
];

module.exports = loginSchema; 