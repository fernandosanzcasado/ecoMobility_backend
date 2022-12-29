const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const estacionesFilterSchema = require("../schemas/estacionesFilterSchema");

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
 *        nPlazas:
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
 *       204:
 *           value:
 *               status: 204
 *               name: "No content"
 *               message: "No content"
 *       200Update:
 *           value:
 *               status: 200
 *               name: "Successful update"
 *               message: "Successful operation"
 *       200Delete:
 *           value:
 *               status: 200
 *               name: "Successful delete"
 *               message: "Successful operation"
 *       400atributos:
 *           value:
 *               status: 400
 *               name: "Missing required attributes"
 *               message: "Bad request"
 *       400atributos2:
 *           value:
 *               status: 400
 *               name: "Invalid attributes"
 *               message: "Bad request"
 *       direccion:
 *           value:
 *               status: 400
 *               name: "Invalid value in direccion"
 *               message: "Bad request"
 *       latitud:
 *           value:
 *               status: 400
 *               name: "Invalid value in latitud"
 *               message: "Bad request"
 *       longitud:
 *           value:
 *               status: 400
 *               name: "Invalid value in longitud"
 *               message: "Bad request"
 *       municipio:
 *           value:
 *               status: 400
 *               name: "Invalid value in municipio"
 *               message: "Bad request"
 *       provincia:
 *           value:
 *               status: 400
 *               name: "Value in provincia must be Barcelona, Tarragona, Lleida or Girona"
 *               message: "Bad request"
 *       codiProv:
 *           value:
 *               status: 400
 *               name: "Invalid value in codiProv"
 *               message: "Bad request"
 *       tipoCorriente:
 *           value:
 *               status: 400
 *               name: "Value in tipoCorriente must be AC, DC or AC-DC"
 *               message: "Bad request"
 *       tipoVelocidad:
 *           value:
 *               status: 400
 *               name: "Value in tipoVelocidad must be RAPID, semiRAPID, NORMAL, RAPID, RAPID i NORMAL, RAPID i semiRAPID, semiRAPID i NORMAL or superRAPID"
 *               message: "Bad request"
 *       tipoVehiculo:
 *           value:
 *               status: 400
 *               name: "Value in tipoVehiculo must be mercaderies, cotxe, moto, moto i cotxe or taxi"
 *               message: "Bad request"
 *       tipoConexion:
 *           value:
 *               status: 400
 *               error: "Invalid value in codiProv"
 *               message: "Bad request"
 *       promotor:
 *           value:
 *               status: 400
 *               name: "Invalid value in codiProv"
 *               message: "Bad request"
 *       potencia:
 *           value:
 *               status: 400
 *               name: "Invalid value in codiProv"
 *               message: "Bad request"
 *       nPlaces:
 *           value:
 *               status: 400
 *               name: "Invalid value in codiProv"
 *               message: "Bad request"
 *       distancia:
 *           value:
 *               status: 400
 *               name: "Invalid value in distancia"
 *               message: "Bad request"
 *       404:
 *           value:
 *               status: 404
 *               name: "ID does not exist"
 *               message: "Not Found"
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
 *          description: Distancia en km máxima a la qu pueden estar las estaciones de carga del usuario.
 *          required: false
 *          explode: false
 *          schema:
 *            type: integer
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
 *                  $ref: "#/components/examples/204"
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              examples:
 *                InvalidAttributes:
 *                  $ref: "#/components/examples/400atributos2"
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
router.get(`/`, estacionesFilterSchema, estacionesController.scanTable);

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
 *                 $ref: "#/components/examples/204"
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
 *                 $ref: "#/components/examples/204"
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
 * /estaciones/{id}:
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
 *               InvalidAttributes:
 *                 $ref: "#/components/examples/400atributos2"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */
router.get(`/:Id`, estacionesController.findById);

/**
 * @swagger
 * /estaciones/{id}/coordenadas:
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
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */
router.get(`/:Id/coordenadas`, estacionesController.getCoordById);

/**
 * @swagger
 * /estaciones/{id}/direccion:
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
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */
router.get(`/:Id/direccion`, estacionesController.getDirById);

/**
 * @swagger
 * /estaciones:
 *  post:
 *     tags:
 *       - Estaciones
 *     summary: Crear una nueva estación.
 *     description: Crear una nueva estación en la DB con los atributos especificados.
 *     operationId: postEstacion
 *     parameters:
 *       - name: direccion
 *         in: query
 *         description: Dirección donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: latitud
 *         in: query
 *         description: Latitud donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: longitud
 *         in: query
 *         description: Longitud donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: municipio
 *         in: query
 *         description: Municipio donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: provincia
 *         in: query
 *         description: Provincia donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - Barcelona
 *             - Tarragona
 *             - Lleida
 *             - Girona
 *       - name: codiProv
 *         in: query
 *         description: Código identificador de la provincia donde se encuentra la nueva estación de carga.
 *         required: true
 *         explode: false
 *         schema:
 *           type: string
 *       - name: tipoCorriente
 *         in: query
 *         description: Tipo de corriente de la que dispone la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - AC
 *             - DC
 *             - AC-DC
 *       - name: tipoVelocidad
 *         in: query
 *         description: Tipo de velocidad de carga de la que dispone la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - RAPID
 *             - semiRAPID
 *             - NORMAL
 *             - RAPID
 *             - RAPID i NORMAL
 *             - RAPID i semiRAPID
 *             - semiRAPID i NORMAL
 *             - superRAPID
 *       - name: tipoVehiculo
 *         in: query
 *         description: Tipos de vehiculos que pueden cargarse en la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - mercaderies
 *             - cotxe
 *             - moto
 *             - moto i cotxe
 *             - taxi
 *       - name: tipoConexion
 *         in: query
 *         description: Tipo de carga de la que dispone la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: promotor
 *         in: query
 *         description: Entidad promotora o gestora de la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: potencia
 *         in: query
 *         description: Potencia en kW de la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: nPlaces
 *         in: query
 *         description: Número de plazas de las que dispone la nueva estación de carga.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *
 *     responses:
 *       201:
 *         description: Estación created
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
 *               MinimumAttributes:
 *                 $ref: "#/components/examples/400atributos"
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
router.post(`/`, userAuthentication.checkAdmin, estacionesController.create);

/**
 * @swagger
 * /estaciones/{id}:
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
 *                 $ref: "#/components/examples/200Delete"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */
router.delete(
  `/:Id`,
  userAuthentication.checkAdmin,
  estacionesController.deleteByID
);

/**
 * @swagger
 * /estaciones/{id}:
 *  put:
 *     tags:
 *       - Estaciones
 *     summary: Actualizar una nueva estación.
 *     description: Actualiza la estacion definida en el path añadiendo los atributos especificados en el body.
 *     operationId: updateEstacion
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador de la estación que queremos actualizar
 *         required: true
 *         schema:
 *           type: string
 *       - name: direccion
 *         in: query
 *         description: Dirección donde se encontrará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: latitud
 *         in: query
 *         description: Latitud donde se encontrará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: longitud
 *         in: query
 *         description: Longitud donde se encontrará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: municipio
 *         in: query
 *         description: Municipio donde se encontrará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: provincia
 *         in: query
 *         description: Provincia donde se encontrará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - Barcelona
 *             - Tarragona
 *             - Lleida
 *             - Girona
 *       - name: codiProv
 *         in: query
 *         description: Código identificador de la provincia donde se encontrará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: tipoCorriente
 *         in: query
 *         description: Tipo de corriente de la que dispondrá la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - AC
 *             - DC
 *             - AC-DC
 *       - name: tipoVelocidad
 *         in: query
 *         description: Tipo de velocidad de carga de la que dispondrá la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - RAPID
 *             - semiRAPID
 *             - NORMAL
 *             - RAPID
 *             - RAPID i NORMAL
 *             - RAPID i semiRAPID
 *             - semiRAPID i NORMAL
 *             - superRAPID
 *       - name: tipoVehiculo
 *         in: query
 *         description: Tipos de vehiculos que podrán cargarse en la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *           enum:
 *             - mercaderies
 *             - cotxe
 *             - moto
 *             - moto i cotxe
 *             - taxi
 *       - name: tipoConexion
 *         in: query
 *         description: Tipo de carga de la que dispondrá la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: promotor
 *         in: query
 *         description: Entidad promotora o gestora de la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: potencia
 *         in: query
 *         description: Potencia en kW de la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: string
 *       - name: nPlazas
 *         in: query
 *         description: Número de plazas de las que contará la estación de carga actualizada.
 *         required: false
 *         explode: false
 *         schema:
 *           type: integer
 *
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
 *               MinimumAttributes:
 *                 $ref: "#/components/examples/400atributos"
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
 *                 $ref: "#/components/examples/404"
 */
router.put(`/:Id`, userAuthentication.checkAdmin, estacionesController.update);

module.exports = router;
