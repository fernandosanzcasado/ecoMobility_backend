const { check } = require("express-validator");

const updateUserInfoSchema = [
    check('name').notEmpty().withMessage("Name field can't be empty.").trim().isAlpha('es-ES').withMessage("Name can only contain letters").isLength({min:2, max:100}).withMessage("Name length must be between 2 and 5 characters"),
    check('surnames').notEmpty().withMessage("Surnames field can't be empty.").trim().isLength({min:2, max:255}).withMessage("Surnames length must be between 2 and 255 characters").isAlpha('es-ES', {ignore: '\s'}).withMessage("Surnames can only contain letters and whitespaces"),
               
];

module.exports = updateUserInfoSchema; 