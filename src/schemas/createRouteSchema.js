const { check } = require("express-validator");

const createRouteSchema = [check('startingCoords').notEmpty().withMessage("StartingCoords field can't be empty").trim().isLatLong().withMessage("Incorrect format.The format must be lat, long or lat,long. Lat must be between[-90,90] and Long must be [-180,180]."),
                           check('endingCoords').notEmpty().withMessage("EndingCoords field can't be empty").trim().isLatLong().withMessage("Incorrect format.The format must be lat, long or lat,long. Lat must be between[-90,90] and Long must be [-180,180]."),
                           check('vehicle').notEmpty().withMessage("Vehicle field can't be empty").trim().isAlpha().withMessage("Vehicle field must contain only letters.")
];

module.exports = createRouteSchema; 