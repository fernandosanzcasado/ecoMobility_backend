const { check } = require("express-validator");

const estacionesCheckIdSchema = [
  check("id")
    .notEmpty()
    .withMessage("El id es un campo obligatorio")
    .trim()
    .matches(/^[0-9a-f-]+$/i)
    .withMessage("El id debe contener sólo dígitos hexadecimales i guiones")
    .isLength({ min: 36, max: 36 })
    .withMessage(
      "El id debe contener 36 carácteres y estar agrupados en 8-4-4-4-12"
    ),
];

module.exports = estacionesCheckIdSchema;
