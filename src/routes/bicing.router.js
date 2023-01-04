const express = require("express");
const router = express.Router();

const bicingController = require("../modules/bicing/controller/bicing.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     BicingData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         lat:
 *           type: Number
 *           example: "41.39"
 *         lon:
 *           type:Number
 *           example:"2.16"
 *         numBikesAvailable:
 *           type: integer
 *           example: 4
 *         numBikesAvailableTypes:
 *           type: object
 *           properties:
 *             electric:
 *               type: integer
 *               example: 2
 *             mechanical:
 *               type: integer
 *               example: 2
 *         numDocksAvailable:
 *           type: integer
 *           example: 19
 *         street:
 *           type: string
 *           example: "Gran Via de les Corts Catalanes, 715"
 *         postalCode:
 *           type: string
 *           example: "08015"
 *         status:
 *           type: string
 *           example: "IN_SERVICE"
 *         totalCapacity:
 *           type: integer
 *           example: 23
 *         isChargingInfo:
 *           type: boolean
 *           example: false
 *     BicingCoordenadas:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         coordinates:
 *           type: string
 *           example: "(41.3985182, 2.1917991)"
 *   examples:
 *     200:
 *       value:
 *         status: 200
 *         error: "Successful operation"
 *         message: "Successful get operation"
 *     400:
 *       value:
 *         status: 400
 *         error: "Bad request"
 *         message: "Invalid ID"
 *     403:
 *       value:
 *         status: 403
 *         error: "Forbidden"
 *         message: "Forbidden"
 *     404:
 *       value:
 *         status: 404
 *         error: "Not found"
 *         message: "ID not found"
 */

/**
 * @swagger
 * /bicing:
 *   get:
 *     tags:
 *       - Bicing
 *     summary: Get all bicing stations
 *     description: Retrieve all bicing stations in the database with all their attributes
 *     operationId: bicingAll
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Bicing"
 *       400:
 *         description: "Bad request"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/400"
 *       404:
 *         description: "Not found"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/500"
 */
router.get("/", bicingController.bicingAll);

/**
 * @swagger
 * /bicing/coordenadas:
 *   get:
 *     tags:
 *       - Bicing
 *     summary: Obtener coordenadas de todas las estaciones de Bicing
 *     description: Obtener las coordenadas de todas las estaciones de Bicing disponibles en la DB.
 *     operationId: bicingCoords
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/BicingCoordenadas"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/401"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */

router.get("/coordenadas", bicingController.bicingCoords);

/**
 * @swagger
 * /info:
 *   get:
 *     tags:
 *       - Bicing
 *     summary: Get all Bicing stations' information
 *     description: Get all Bicing stations' information including latitude, longitude, street name, number of available bikes and bike docks, and whether it's a charging station.
 *     operationId: bicingInfo
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   lon:
 *                     type:Number
 *                     example:"2.16"
 *                   lat:
 *                     type: Number
 *                     example: "41.39"
 *                   num_bikes_available_types:
 *                     type: object
 *                     properties:
 *                       mechanical:
 *                         type: integer
 *                         example: 11
 *                       ebike:
 *                         type: integer
 *                         example: 2
 *                   num_docks_available:
 *                     type: integer
 *                     example: 7
 *                   Street:
 *                     type: string
 *                     example: "Gran Via de les Corts Catalanes, 715"
 *                   slots:
 *                     type: integer
 *                     example: 23
 *                   postalCode:
 *                     type: integer
 *                     example: 8015
 *                   totalCapacity:
 *                     type: integer
 *                     example: 30
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/400"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/401"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/404"
 */

router.get("/info", bicingController.bicingInfo);

/**
 * @swagger
 * /bicing/count:
 *  get:
 *    tags:
 *      - Bicing
 *    summary: Obtener la cantidad de estaciones de Bicing en la base de datos.
 *    description: Obtener en una variable el numero de instancias en la base de datos de estaciones de Bicing.
 *    operationId: bicingCount
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          integer:
 *            schema:
 *              type: integer
 *              example: 207
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *                $ref: "#/components/examples/400"
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *                $ref: "#/components/examples/401"
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            examples:
 *              example:
 *                $ref: "#/components/examples/404"
 */
router.get("/count", bicingController.bicingCount);

/**
 * @swagger
 * /bicing/coordenadas/{id}:
 *   get:
 *     tags:
 *       - Bicing
 *     summary: Obtener las coordenadas de una estación de Bicing específica
 *     description: Obtener las coordenadas de una estación de Bicing específica a partir de su ID
 *     operationId: bicingCoordsById
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la estación de Bicing
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 4
 *                 coordinates:
 *                   type: string
 *                   example: "(41.397952, 2.180042)"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/400"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             examples:
 *               example:
 *                 $ref: "#/components/examples/404"
 */

router.get("/coordenadas/:id", bicingController.bicingCoordsById);

/**
 * @swagger
 * /bicing/info/{id}:
 *   get:
 *     tags:
 *       - Bicing
 *     summary: Obtener información de una estación de bicing por ID
 *     description: Obtener información detallada de una estación de bicing específica por su ID.
 *     operationId: bicingInfoById
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la estación de bicing
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 lon:
 *                   type:Number
 *                   example:"2.16"
 *                 lat:
 *                   type: Number
 *                   example: "41.39"
 *                 num_bikes_available:
 *                   type: integer
 *                   example: 6
 *                 num_bikes_available_types:
 *                   type: object
 *                   example: { "mechanical": 6 }
 *                 num_docks_available:
 *                   type: integer
 *                   example: 17
 *                 Street:
 *                   type: string
 *                   example: "Gran Via de les Corts Catalanes, 715"
 *                 slots:
 *                   type: integer
 *                   example: 23
 *                 numDocksAvailable:
 *                   type: integer
 *                   example: 17
 *                 "Postal Code":
 *                   type: integer
 *                   example: 8013
 *                 totalCapacity:
 *                   type: integer
 *                   example: 30
 *                 is_charging_station:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/400"
 *       404:
 *         description: ID not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/404"
 */

router.get("/info/:id", bicingController.bicingInfoById);
/**
 * @swagger
 * /bicing/{id}:
 *   get:
 *     tags:
 *       - Bicing
 *     summary: Obtener información de una estación de Bicing por ID
 *     description: Obtener toda la información de una estación de Bicing específica por su ID.
 *     operationId: bicingAllById
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la estación de Bicing
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 lon:
 *                   type:Number
 *                   example:"2.16"
 *                 lat:
 *                   type: Number
 *                   example: "41.39"
 *                 num_bikes_available:
 *                    type: integer
 *                    example: 10
 *                 num_bikes_available_types:
 *                   type: object
 *                   example: { "mechanical": 10 }
 *                 num_docks_available:
 *                   type: integer
 *                   example: 13
 *                 Street:
 *                   type: string
 *                   example: "Gran Via de les Corts Catalanes, 715"
 *                 slots:
 *                   type: integer
 *                   example: 23
 *                 numDocksAvailable:
 *                   type: boolean
 *                   example: true
 *                 coordinates:
 *                   type: string
 *                   example: "(41.3972128, 2.1683059)"
 *                 postalCode:
 *                   type: string
 *                   example: "08015"
 *                 totalCapacity:
 *                   type: integer
 *                   example: 33
 *                 is_charging_station:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: ID not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/examples/404"
 *       400:
 *         description: "Invalid fields"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/examples/400InvalidFields"
 *       401:
 *         description: "Unauthorized"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/examples/401"
 *       403:
 *         description: "Forbidden"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: "#/components/examples/403"
 */

router.get("/:id", bicingController.bicingAllById);

module.exports = router;
