const { check } = require("express-validator");

const updateRouteSchema = [check('km').notEmpty().withMessage("Km field can't be empty").trim().isNumeric().withMessage("Km must be a number").trim(),
                           check('cancelled').notEmpty().withMessage("Cancelled field can't be empty").isBoolean({ loose: false }).trim().toBoolean(),

                           
];

module.exports = updateRouteSchema; 