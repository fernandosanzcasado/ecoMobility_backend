const { check } = require("express-validator");

const updateRouteSchema = [check('km').notEmpty().withMessage("Km field can't be empty").trim().isNumeric().withMessage("Km must be a number").trim(),
                           
];

module.exports = updateRouteSchema; 