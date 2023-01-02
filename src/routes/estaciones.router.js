const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const estacionesFilterSchema = require("../schemas/estacionesFilterSchema");
const estacionesCheckIdSchema = require("../schemas/estacionesCheckIdSchema");
const estacionesPostAttrSchema = require("../schemas/estacionesPostAttrSchema");
const estacionesPutAttrSchema = require("../schemas/estacionesPutAttrSchema");

const handleError = require("../middleware/errorHandler");
const validateRequsestSchema = require("../middleware/validateRequestSchema");
const userAuthentication = require("../middleware/userAuthentication");

const estacionesController = require("../modules/estaciones/controller/estaciones.controller");

/**
 * @swagger
 *
 *components:
 *  schemas:
 *    Estacion:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          example: "550e8400-e29b-41d4-a716-446655440000"
 *        direccion:
 *          type: string
 *          example: "Avinguda Meridiana, 66"
 *        codiProv:
 *          type: string
 *          example: "08"
 *        latitud:
 *          type: string
 *          example: "41.74441"
 *        longitud:
 *          type: string
 *          example: "2.18729"
 *        municipio:
 *          type: string
 *          example: "Barcelona"
 *        nPlaces:
 *          type: integer
 *          format: int64
 *          example: 3
 *        potencia:
 *          type: integer
 *          format: int64
 *          example: 22
 *        promotor:
 *          type: string
 *          example: "Generalitat de Catalunya"
 *        provincia:
 *          type: string
 *          example: "Barcelona"
 *          enum:
 *            - Tarragona
 *            - Girona
 *            - Barcelona
 *            - Lleida
 *        tipoConexion:
 *          type: string
 *          example: "2xMENNEKES.F"
 *        tipoCorriente:
 *          type: string
 *          example: "AC"
 *          enum:
 *            - AC
 *            - DC
 *            - AC-DC
 *        tipoVehiculo:
 *          type: string
 *          example: "cotxe i moto"
 *          enum:
 *            - mercaderies
 *            - cotxe
 *            - moto
 *            - moto i cotxe
 *            - taxi
 *        tipoVelocidad:
 *          type: string
 *          example: "semiRAPID"
 *          enum:
 *            - RAPID
 *            - semiRAPID
 *            - NORMAL
 *            - RAPID
 *            - RAPID i NORMAL
 *            - RAPID i semiRAPID
 *            - semiRAPID i NORMAL
 *            - superRAPID
 *
 *    CoordEstacion:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          example: "550e8400-e29b-41d4-a716-446655440000"
 *        latitud:
 *          type: string
 *          example: "41.74441"
 *        longitud:
 *          type: string
 *          example: "2.18729"
 *
 *    DirEstacion:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          example: "550e8400-e29b-41d4-a716-446655440000"
 *        direccion:
 *          type: string
 *          example: "Avinguda Meridiana, 66"
 *
 *  examples:
 *       204NoContent:
 *           value:
 *               status: 204
 *               name: "EstacionNoContentError"
 *               message: "No hay contenido para esta llamada"
 *       400atributos2:
 *           value:
 *               status: 400
 *               name: "EstacionWrongAttrError"
 *               message: "El atributo X es invalido"
 *       id:
 *           value:
 *               errors:
 *                - name: Invalid id
 *                  message: El id debe contener sólo dígitos hexadecimales y guiones
 *                  status: 400
 *       id2:
 *           value:
 *               errors:
 *                - name: Invalid id
 *                  message: El id debe contener 36 carácteres y estar agrupados en 8-4-4-4-12
 *                  status: 400
 *       id3:
 *           value:
 *               errors:
 *                - name: Invalid id
 *                  message: El id es un campo obligatorio
 *                  status: 400
 *       direccion:
 *           value:
 *               errors:
 *                - name: Invalid direccion
 *                  message: La dirección solo puede contener numeros, letras, algunos caràcteres especiales y espacios en blanco entre palabras
 *                  status: 400
 *       direccion2:
 *           value:
 *               errors:
 *                - name: Invalid direccion
 *                  message: La dirección es un campo obligatorio
 *                  status: 400
 *       requiredLatitud:
 *           value:
 *               status: 400
 *               name: "EstacionFaltaLatCoordsError"
 *               message: "Se ha declarado el parametro 'distancia' pero no se han declarado coordenadas de latitud del usuario"
 *       latitud:
 *           value:
 *               errors:
 *                - name: Invalid latitud
 *                  message: La latitud solo puede contener numeros y puntos
 *                  status: 400
 *       latitud2:
 *           value:
 *               errors:
 *                - name: Invalid latitud
 *                  message: La latitud es un campo obligatorio
 *                  status: 400
 *       requiredLongitud:
 *           value:
 *               status: 400
 *               name: "EstacionFaltaLongCoordsError"
 *               message: "Se ha declarado el parametro 'distancia' pero no se han declarado coordenadas de latitud del usuario"
 *       longitud:
 *           value:
 *               errors:
 *                - name: Invalid longitud
 *                  message: La longitud solo puede contener numeros y puntos
 *                  status: 400
 *       longitud2:
 *           value:
 *               errors:
 *                - name: Invalid longitud
 *                  message: La longitud es un campo obligatorio
 *                  status: 400
 *       municipio:
 *           value:
 *               errors:
 *                - name: Invalid municipio
 *                  message: El municipio solo puede contener numeros, letras, algunos caràcteres especiales y espacios en blanco entre palabras
 *                  status: 400
 *       municipio2:
 *           value:
 *               errors:
 *                - name: Invalid municipio
 *                  message: El municipio es un campo obligatorio
 *                  status: 400
 *       provincia:
 *           value:
 *               errors:
 *                - name: Invalid provincia
 *                  message: La provincia solo puede contener numeros, letras, algunos caràcteres especiales y espacios en blanco entre palabras
 *                  status: 400
 *       codiProv:
 *           value:
 *               errors:
 *                - name: Invalid codiProv
 *                  message: El código de provincia solo puede contener numeros
 *                  status: 400
 *       codiProv2:
 *           value:
 *               errors:
 *                - name: Invalid codiProv
 *                  message: El código de provincia es un campo obligatorio
 *                  status: 400
 *       tipoCorriente:
 *           value:
 *               errors:
 *                - name: Invalid tipoCorriente
 *                  message: El tipo de corriente debe ser AC, DC o AC-DC
 *                  status: 400
 *       tipoVelocidad:
 *           value:
 *               errors:
 *                - name: Invalid tipoVelocidad
 *                  message: El tipo de velocidad debe ser RAPID, semiRAPID, NORMAL, RAPID, RAPID i NORMAL, RAPID i semiRAPID, semiRAPID i NORMAL o superRAPID
 *                  status: 400
 *       tipoVehiculo:
 *           value:
 *               errors:
 *                - name: Invalid tipoVehiculo
 *                  message: El tipo de vehículo debe ser mercaderies, cotxe, moto, moto i cotxe o taxi
 *                  status: 400
 *       tipoConexion:
 *           value:
 *               errors:
 *                - name: Invalid tipoConexion
 *                  message: El tipo de conexión solo puede contener numeros, letras, algunos caràcteres especiales y espacios en blanco entre palabras
 *                  status: 400
 *       promotor:
 *           value:
 *               errors:
 *                - name: Invalid promotor
 *                  message: El promotor solo puede contener numeros, letras, algunos caràcteres especiales y espacios en blanco entre palabras
 *                  status: 400
 *       potencia:
 *           value:
 *               errors:
 *                - name: Invalid potencia
 *                  message: La potencia ha de ser un integer
 *                  status: 400
 *       nPlaces:
 *           value:
 *               errors:
 *                - name: Invalid nPlaces
 *                  message: El numero de plazas ha de ser un integer
 *                  status: 400
 *       distancia:
 *           value:
 *               errors:
 *                - name: Invalid potencia
 *                  message: La distancia ha de ser un integer
 *                  status: 400
 *       404Id:
 *           value:
 *               status: 404
 *               name: "EstacionNotFoundError"
 *               message: "Estacion no encontrada"
 *
 */

/**
 * @swagger
 * tags:
 *  name: Estaciones
 *  description: Endpoints para estaciones
 */

/**
 * @swagger
 * /estaciones:
 *    get:
 *      tags:
 *        - Estaciones
 *      summary: Obtener todas las estaciones con filtros.
 *      description: Obtener todas las estaciones de la DB que cumplan con todos los requisitos (si están declarados) con todos sus atributos.
 *      operationId: getAllEstaciones
 *      parameters:
 *        - name: tipoCorriente
 *          in: query
 *          description: Tipo de corriente que han de tener las estaciones de carga.
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *            enum:
 *              - AC
 *              - DC
 *              - AC-DC
 *        - name: tipoVelocidad
 *          in: query
 *          description: Tipo de velocidad de carga que han de tener las estaciones de carga.
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *            enum:
 *              - RAPID
 *              - semiRAPID
 *              - NORMAL
 *              - RAPID
 *              - RAPID i NORMAL
 *              - RAPID i semiRAPID
 *              - semiRAPID i NORMAL
 *              - superRAPID
 *        - name: tipoVehiculo
 *          in: query
 *          description: Tipo de vehicullo que ha de ser compatible con las estaciones de carga.
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *            enum:
 *              - mercaderies
 *              - cotxe
 *              - moto
 *              - moto i cotxe
 *              - taxi
 *        - name: tipoConexion
 *          in: query
 *          description: Tipo de conexión que han de tener las estaciones de carga.
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *        - name: potencia
 *          in: query
 *          description: Potencia mínima en kw que han de tener las estaciones de carga.
 *          required: false
 *          explode: false
 *          schema:
 *            type: integer
 *        - name: distancia
 *          in: query
 *          description: Distancia en km máxima a la que pueden estar las estaciones de carga del usuario.
 *          required: false
 *          explode: false
 *          schema:
 *            type: integer
 *        - name: latitud
 *          in: query
 *          description: Latitud a la que está el usuario a partir del cual calcular la distancia.
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *        - name: longitud
 *          in: query
 *          description: Longitud a la que está el usuario a partir del cual calcular la distancia.
 *          required: false
 *          explode: false
 *          schema:
 *            type: string
 *
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Estacion"
 *        204:
 *          description: "No content"
 *          content:
 *            application/json:
 *              examples:
 *                example:
 *                  $ref: "#/components/examples/204NoContent"
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              examples:
 *                invalidAttributes:
 *                  $ref: "#/components/examples/400atributos2"
 *                requiredLongitud:
 *                  $ref: "#/components/examples/requiredLongitud"
 *                requiredLatitud:
 *                  $ref: "#/components/examples/requiredLatitud"
 *                tipoCorriente:
 *                  $ref: "#/components/examples/tipoCorriente"
 *                tipoVelocidad:
 *                  $ref: "#/components/examples/tipoVelocidad"
 *                tipoVehiculo:
 *                  $ref: "#/components/examples/tipoVehiculo"
 *                tipoConexion:
 *                  $ref: "#/components/examples/tipoConexion"
 *                potencia:
 *                  $ref: "#/components/examples/potencia"
 *                distancia:
 *                  $ref: "#/components/examples/distancia"
 *
 */
router.get(
  `/`,
  estacionesFilterSchema,
  validateRequsestSchema,
  estacionesController.scanTable
);

/**
 * @swagger
 * /estaciones/coordenadas:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener las coordenadas de todas las estaciones
 *     description: Obtener los atributos "longitud", "latitud" y "id" de todas las estaciones de la DB.
 *     operationId: getCoordAllEstaciones
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/CoordEstacion"
 *       204:
 *         description: "No content"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/204NoContent"
 */
router.get(`/coordenadas`, estacionesController.getTableCoord);

/**
 * @swagger
 * /estaciones/direccion:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener la dirección de todas las estaciones
 *     description: Obtener los atributos "direccion" y "id" de todas las estaciones de la DB.
 *     operationId: getDirAllEstaciones
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/DirEstacion"
 *       204:
 *         description: "No content"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/204NoContent"
 */
router.get(`/direccion`, estacionesController.getTableDir);

/**
 * @swagger
 * /estaciones/count:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener la cantidad de estaciones en la base de datos.
 *     description: Obtener en una variable el numero de instancias en la base de datos de estaciones de vehículos eléctricos.
 *     operationId: countEstaciones
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           integer:
 *             schema:
 *               type: integer
 *               example: 207
 */
router.get(`/count`, estacionesController.countEstaciones);

/**
 * @swagger
 * /estaciones/info/{id}:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener una estacion concreta
 *     description: Obtener todos los atributos de la estacion especificada en el path.
 *     operationId: getEstacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador de la estación que queremos consultar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Estacion"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               idRequired:
 *                 $ref: "#/components/examples/id3"
 *               InvalidCharacters:
 *                 $ref: "#/components/examples/id"
 *               idTooShort:
 *                 $ref: "#/components/examples/id2"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404Id"
 */
router.get(
  `/info/:id`,
  estacionesCheckIdSchema,
  validateRequsestSchema,
  estacionesController.findById
);

/**
 * @swagger
 * /estaciones/info/{id}/coordenadas:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener las coordenadas de una estacion concreta
 *     description: Obtener los atributos "longitud", "latitud" y "id" de la estacion especificada en el path.
 *     operationId: getCoordEstacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador de la estación que queremos consultar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/CoordEstacion"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               idRequired:
 *                 $ref: "#/components/examples/id3"
 *               InvalidCharacters:
 *                 $ref: "#/components/examples/id"
 *               idTooShort:
 *                 $ref: "#/components/examples/id2"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404Id"
 */
router.get(
  `/info/:id/coordenadas`,
  estacionesCheckIdSchema,
  validateRequsestSchema,
  estacionesController.getCoordById
);

/**
 * @swagger
 * /estaciones/info/{id}/direccion:
 *   get:
 *     tags:
 *       - Estaciones
 *     summary: Obtener la direccion de una estacion concreta
 *     description: Obtener los atributos "direccion" y "id" de la estacion especificada en el path.
 *     operationId: getDirEstacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador de la estación que queremos consultar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/DirEstacion"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               idRequired:
 *                 $ref: "#/components/examples/id3"
 *               InvalidCharacters:
 *                 $ref: "#/components/examples/id"
 *               idTooShort:
 *                 $ref: "#/components/examples/id2"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404Id"
 */
router.get(
  `/info/:id/direccion`,
  estacionesCheckIdSchema,
  validateRequsestSchema,
  estacionesController.getDirById
);

/**
 * @swagger
 * /estaciones:
 *  post:
 *     tags:
 *       - Estaciones
 *     summary: Crear una nueva estación.
 *     description: Crea la estacion definida por los atributos especificados en el body.
 *     operationId: postEstacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - direccion
 *               - latitud
 *               - longitud
 *               - municipio
 *               - provincia
 *               - codiProv
 *             properties:
 *               direccion:
 *                 type: string
 *               latitud:
 *                 type: string
 *               longitud:
 *                 type: string
 *               municipio:
 *                 type: string
 *               provincia:
 *                 type: string
 *               codiProv:
 *                 type: string
 *               tipoCorriente:
 *                 type: string
 *               tipoVelocidad:
 *                 type: string
 *               tipoVehiculo:
 *                 type: string
 *               tipoConexion:
 *                 type: string
 *               promotor:
 *                 type: string
 *               potencia:
 *                 type: integer
 *               nPlaces:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Estacion"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               InvalidAttributes:
 *                 $ref: "#/components/examples/400atributos2"
 *               direccion:
 *                 $ref: "#/components/examples/direccion"
 *               latitud:
 *                 $ref: "#/components/examples/latitud"
 *               longitud:
 *                 $ref: "#/components/examples/longitud"
 *               municipio:
 *                 $ref: "#/components/examples/municipio"
 *               codiProv:
 *                 $ref: "#/components/examples/codiProv"
 *               direccion2:
 *                 $ref: "#/components/examples/direccion2"
 *               latitud2:
 *                 $ref: "#/components/examples/latitud2"
 *               longitud2:
 *                 $ref: "#/components/examples/longitud2"
 *               municipio2:
 *                 $ref: "#/components/examples/municipio2"
 *               codiProv2:
 *                 $ref: "#/components/examples/codiProv2"
 *               tipoCorriente:
 *                 $ref: "#/components/examples/tipoCorriente"
 *               tipoVelocidad:
 *                 $ref: "#/components/examples/tipoVelocidad"
 *               tipoVehiculo:
 *                 $ref: "#/components/examples/tipoVehiculo"
 *               tipoConexion:
 *                 $ref: "#/components/examples/tipoConexion"
 *               promotor:
 *                 $ref: "#/components/examples/promotor"
 *               potencia:
 *                 $ref: "#/components/examples/potencia"
 *               nPlaces:
 *                 $ref: "#/components/examples/nPlaces"
 */
router.post(
  `/`,
  estacionesPostAttrSchema,
  validateRequsestSchema,
  userAuthentication.checkAdmin,
  estacionesController.create
);

/**
 * @swagger
 * /estaciones/info/{id}:
 *  delete:
 *     tags:
 *       - Estaciones
 *     summary: Eliminar una estacion concreta
 *     description: Eliminar la estacion especificada en el path.
 *     operationId: deleteEstacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador de la estación que queremos eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Estacion"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               idRequired:
 *                 $ref: "#/components/examples/id3"
 *               InvalidCharacters:
 *                 $ref: "#/components/examples/id"
 *               idTooShort:
 *                 $ref: "#/components/examples/id2"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404Id"
 */
router.delete(
  `/info/:id`,
  estacionesCheckIdSchema,
  validateRequsestSchema,
  userAuthentication.checkAdmin,
  estacionesController.deleteByID
);

/**
 * @swagger
 * /estaciones/info/{id}:
 *  put:
 *     tags:
 *       - Estaciones
 *     summary: Actualizar una nueva estación.
 *     description: Actualiza la estacion definida en el path añadiendo los atributos especificados en el body.
 *     operationId: updateEstacion
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direccion:
 *                 type: string
 *               latitud:
 *                 type: string
 *               longitud:
 *                 type: string
 *               municipio:
 *                 type: string
 *               provincia:
 *                 type: string
 *               codiProv:
 *                 type: string
 *               tipoCorriente:
 *                 type: string
 *               tipoVelocidad:
 *                 type: string
 *               tipoVehiculo:
 *                 type: string
 *               tipoConexion:
 *                 type: string
 *               promotor:
 *                 type: string
 *               potencia:
 *                 type: integer
 *               nPlaces:
 *                 type: integer
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador de la estación que queremos eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Estacion"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               InvalidAttributes:
 *                 $ref: "#/components/examples/400atributos2"
 *               id:
 *                 $ref: "#/components/examples/id"
 *               id2:
 *                 $ref: "#/components/examples/id2"
 *               id3:
 *                 $ref: "#/components/examples/id3"
 *               direccion:
 *                 $ref: "#/components/examples/direccion"
 *               latitud:
 *                 $ref: "#/components/examples/latitud"
 *               longitud:
 *                 $ref: "#/components/examples/longitud"
 *               municipio:
 *                 $ref: "#/components/examples/municipio"
 *               codiProv:
 *                 $ref: "#/components/examples/codiProv"
 *               tipoCorriente:
 *                 $ref: "#/components/examples/tipoCorriente"
 *               tipoVelocidad:
 *                 $ref: "#/components/examples/tipoVelocidad"
 *               tipoVehiculo:
 *                 $ref: "#/components/examples/tipoVehiculo"
 *               tipoConexion:
 *                 $ref: "#/components/examples/tipoConexion"
 *               promotor:
 *                 $ref: "#/components/examples/promotor"
 *               potencia:
 *                 $ref: "#/components/examples/potencia"
 *               nPlaces:
 *                 $ref: "#/components/examples/nPlaces"
 *       404:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404Id"
 */
router.put(
  `/info/:id`,
  estacionesCheckIdSchema,
  estacionesPutAttrSchema,
  validateRequsestSchema,
  userAuthentication.checkAdmin,
  estacionesController.update
);

module.exports = router;
