const { check } = require("express-validator");

const addOrDeleteFavouriteStation = [check('stationId').notEmpty().withMessage("Name field can't be empty").trim(),
                       
];

module.exports = addOrDeleteFavouriteStation; 