const { check } = require("express-validator");

const valoracionesPostSchema = [
  check("idEstacion")
    .notEmpty()
    .withMessage("El idEstacion es un campo obligatorio")
    .trim()
    .matches(/^[0-9a-f-]+$/i)
    .withMessage(
      "El idEstacion debe contener sólo dígitos hexadecimales i guiones"
    )
    .isLength({ min: 36, max: 36 })
    .withMessage(
      "El idEstacion debe contener 36 carácteres y estar agrupados en 8-4-4-4-12"
    ),
  check("emailUser")
    .notEmpty()
    .withMessage("El emailUser es un campo obligatorio")
    .trim()
    .isEmail()
    .withMessage("emailUser ha de tener estructura de correo electrónico")
    .normalizeEmail(),
  check("valoracion")
    .notEmpty()
    .withMessage("La valoracion es un campo obligatorio")
    .trim()
    .isInt({ max: 10 })
    .withMessage("La valoracion ha de ser un integer"),
];

module.exports = valoracionesPostSchema;
