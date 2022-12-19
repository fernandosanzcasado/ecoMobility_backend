const { check } = require("express-validator");

const emailInputSchema = [check('email').notEmpty().withMessage("Email field can't be empty").isEmail().withMessage("Email field must have an email structure").normalizeEmail(),
];

module.exports = emailInputSchema; 