const { check } = require("express-validator");

const estacionesCheckIdSchema = [
  check("id")
    //.isLength({ min: 2, max: 100 })
    //.withMessage("El id debe tner 36 carácteres y estar en formato 8-4-4-4-12")
    .trim(),
];

module.exports = estacionesCheckIdSchema;
