const { check } = require("express-validator");

const valoracionesUpdateSchema = [
  check("id")
    .notEmpty()
    .withMessage("El id de la valoración es un campo obligatorio")
    .trim()
    .matches(/^[0-9a-f-]+$/i)
    .withMessage("El id debe contener sólo dígitos hexadecimales i guiones")
    .isLength({ min: 36, max: 36 })
    .withMessage(
      "El id debe contener 36 carácteres y estar agrupados en 8-4-4-4-12"
    ),
  check("valoracion")
    .notEmpty()
    .withMessage("La valoracion es un campo obligatorio")
    .trim()
    .isInt({ max: 10 })
    .withMessage("La valoración ha de ser un integer con un rango de 0 a 10"),
];

module.exports = valoracionesUpdateSchema;
