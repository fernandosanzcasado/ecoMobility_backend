const { check } = require("express-validator");

const estacionesFilterSchema = [check('tipoCorriente').optional().isIn(['AC', 'DC', 'AC-DC']).withMessage('El tipo de corriente debe ser AC, DC o AC-DC').trim(),
                check('tipoVelocidad').optional().isIn(['RAPID', 'semiRAPID', 'NORMAL', 'RAPID', 'RAPID i NORMAL', 'RAPID i semiRAPID', 'semiRAPID i NORMAL', 'superRAPID']).withMessage('El tipo de corriente debe ser RAPID, semiRAPID, NORMAL, RAPID, RAPID i NORMAL, RAPID i semiRAPID, semiRAPID i NORMAL o superRAPID').trim(),
                check('tipoVehiculo').optional().isIn(['mercaderies', 'cotxe', 'moto', 'moto i cotxe', 'taxi']).withMessage('El tipo de corriente debe ser mercaderies, cotxe, moto, moto i cotxe o taxi').trim(),
                check('tipoConexion').optional().trim().matches('^[A-Za-z0-9_@./#&+-]*$').withMessage("tipoConexion can only contain letters,numbers and some special characters").trim(),
                check('potencia').optional().trim().isInt().withMessage('potencia must be an integer'),
                check('distancia').optional().trim().isInt().withMessage('potencia must be an integer')
];

module.exports = estacionesFilterSchema; 