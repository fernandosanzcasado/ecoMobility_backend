const { check } = require("express-validator");

const updatePasswordSchema = [
                check('password').notEmpty().withMessage("Password field can't be empty.").trim().isLength({min:8}).withMessage("Password must have at least 8 characters").matches('^[A-Za-z0-9_@./#&+-]*$').withMessage("Password can only contain letters,numbers and some special characters")
];

module.exports = updatePasswordSchema; 