const express = require('express');


const routesController = require('../modules/routes/controller/routes.controller');

const createRouteSchema = require('../schemas/createRouteSchema');
const updateRouteSchema = require('../schemas/updateRouteSchema');

const validateRequsestSchema = require('../middleware/validateRequestSchema');
const handleError = require("../middleware/errorHandler");
const userAuthentication = require("../middleware/userAuthentication");


const router = express.Router();



router.use(userAuthentication.checkAuthenticated, userAuthentication.checkBlocked);

router.post(`/`, createRouteSchema, validateRequsestSchema, routesController.createRoute);
router.get(`/:id`, routesController.getRoute);
router.put(`/:id`, updateRouteSchema, validateRequsestSchema, routesController.updateRoute);





module.exports = router;