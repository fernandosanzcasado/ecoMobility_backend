const { check } = require("express-validator");

const adminUpdateUser = [check('name').notEmpty().withMessage("Name field can't be empty").trim(),
                         check('surnames').notEmpty().withMessage("Surnames field can't be empty").trim(),
                         check('isSuperuser').notEmpty().withMessage("IsSuperuser field can't be empty").trim().isBoolean({ loose: false }).withMessage("IsSuperuser field must be a boolean"),
                         check('isBlocked').notEmpty().withMessage("IsBlocked field can't be empty").trim().isBoolean({ loose: false }).withMessage("IsBlocked field must be a boolean")
];

module.exports = adminUpdateUser; 