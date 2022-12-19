const express = require("express");
const router = express.Router();

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
router.get(`/`, estacionesController.scanTable);

router.get(`/coordenadas`, estacionesController.getTableCoord);

router.get(`/direccion`, estacionesController.getTableDir);

router.get("/bicing_station_status", estacionesController.bicing);
router.get("/bicing_station_info", estacionesController.bicing_segundo);
router.get("/bicing3", estacionesController.bicing_tercero);

router.get(`/:Id`, estacionesController.findById);

router.get(`/:Id/coordenadas`, estacionesController.getCoordById);

router.get(`/:Id/direccion`, estacionesController.getDirById);

router.post(`/`, estacionesController.create);

router.delete(`/:Id`, estacionesController.deleteByID);

router.put(`/:Id`, estacionesController.update);

router.get(`/atributs`, estacionesController.contratributs);

module.exports = router;
