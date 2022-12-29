const { check } = require("express-validator");

const estacionesFilterSchema = [
  check("tipoCorriente")
    .optional()
    .isIn(["AC", "DC", "AC-DC"])
    .withMessage("El tipo de corriente debe ser AC, DC o AC-DC")
    .trim(),
  check("tipoVelocidad")
    .optional()
    .isIn([
      "RAPID",
      "semiRAPID",
      "NORMAL",
      "RAPID",
      "RAPID i NORMAL",
      "RAPID i semiRAPID",
      "semiRAPID i NORMAL",
      "superRAPID",
    ])
    .withMessage(
      "El tipo de velocidad debe ser RAPID, semiRAPID, NORMAL, RAPID, RAPID i NORMAL, RAPID i semiRAPID, semiRAPID i NORMAL o superRAPID"
    )
    .trim(),
  check("tipoVehiculo")
    .optional()
    .isIn(["mercaderies", "cotxe", "moto", "moto i cotxe", "taxi"])
    .withMessage(
      "El tipo de vehículo debe ser mercaderies, cotxe, moto, moto i cotxe o taxi"
    )
    .trim(),
  check("tipoConexion")
    .optional()
    .trim()
    .matches("^[A-Za-z0-9_@./#&+-]*$")
    .withMessage(
      "El tipo de conexión solo puede contener numeros, letras y algunos caràcteres especiales"
    )
    .trim(),
  check("potencia")
    .optional()
    .trim()
    .isInt()
    .withMessage("La potencia ha de ser un integer"),
  check("distancia")
    .optional()
    .trim()
    .isInt()
    .withMessage("La distancia ha de ser integer"),
];

module.exports = estacionesFilterSchema;
