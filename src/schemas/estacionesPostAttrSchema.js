const { check } = require("express-validator");

const estacionesPostAttrSchema = [
  check("direccion")
    .notEmpty()
    .withMessage("La dirección es un campo obligatorio")
    .trim()
    .matches("^[a-zA-Z0-9_@./#&+-]+( [a-zA-Z0-9_@./#&+-]+)*$") 
    .withMessage(
      "La dirección solo puede contener numeros, letras, algunos caràcteres especiales y espacios en blanco entre palabras"
    ),
  check("codiProv")
    .notEmpty()
    .withMessage("El código de provincia es un campo obligatorio")
    .trim()
    .matches("^[0-9]*$")
    .withMessage("El código de provincia solo puede contener numeros"),
  check("latitud")
    .notEmpty()
    .withMessage("La latitud es un campo obligatorio")
    .trim()
    .matches("^[0-9.]*$")
    .withMessage("La latitud solo puede contener numeros y puntos"),
  check("longitud")
    .notEmpty()
    .withMessage("La longitud es un campo obligatorio")
    .trim()
    .matches("^[0-9.]*$")
    .withMessage("La longitud solo puede contener numeros y puntos"),
  check("municipio")
    .notEmpty()
    .withMessage("El municipio es un campo obligatorio")
    .trim()
    .matches("^[a-zA-Z0-9_@./#&+-]+( [a-zA-Z0-9_@./#&+-]+)*$") 
    .withMessage(
      "El municipio solo puede contener numeros, letras y algunos caràcteres especiales y espacios en blanco entre palabras"
    ),

  check("promotor")
    .optional()
    .trim()
    .matches("^[a-zA-Z0-9_@./#&+-]+( [a-zA-Z0-9_@./#&+-]+)*$") 
    .withMessage(
      "El promotor solo puede contener numeros, letras y algunos caràcteres especiales y espacios en blanco entre palabras"
    ),
  check("nPlaces")
    .optional()
    .trim()
    .isInt()
    .withMessage("El numero de plazas ha de ser un integer"),
  check("provincia")
    .optional()
    .trim()
    .matches("^[a-zA-Z0-9_@./#&+-]+( [a-zA-Z0-9_@./#&+-]+)*$") 
    .withMessage(
      "La provincia solo puede contener numeros, letras y algunos caràcteres especiales y espacios en blanco entre palabras"
    ),
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
    .matches("^[a-zA-Z0-9_@./#&+-]+( [a-zA-Z0-9_@./#&+-]+)*$") 
    .withMessage(
      "El tipo de conexión solo puede contener numeros, letras y algunos caràcteres especiales y espacios en blanco entre palabras"
    ),
  check("potencia")
    .optional()
    .trim()
    .isInt()
    .withMessage("La potencia ha de ser un integer"),
];

module.exports = estacionesPostAttrSchema;
