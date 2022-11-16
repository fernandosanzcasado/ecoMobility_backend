const { check } = require("express-validator");

const registerSchema = [check('email').notEmpty().withMessage("Email field can't be empty.").isEmail().withMessage("The email field must have an email structure").normalizeEmail(),
                check('name').notEmpty().withMessage("Name field can't be empty.").trim().isAlpha('es-ES').withMessage("Name can only contain letters").isLength({min:2, max:100}).withMessage("Name length must be between 2 and 5 characters"),
                check('surnames').notEmpty().withMessage("Surnames field can't be empty.").trim().isLength({min:2, max:255}).withMessage("Surnames length must be between 2 and 255 characters").isAlpha('es-ES', {ignore: '\s'}).withMessage("Surnames can only contain letters and whitespaces"),
                check('password').notEmpty().withMessage("Password field can't be empty.").trim().isLength({min:8}).withMessage("Password must have at least 8 characters").matches('^[A-Za-z0-9_@./#&+-]*$').withMessage("Password can only contain letters,numbers and some special characters")
];

module.exports = registerSchema; 