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
router.put(`/`, updateRouteSchema, validateRequsestSchema, routesController.updateRoute);
router.get(`/user/getLastRoute`, routesController.getLastRoute);
router.get(`/user/getRoutes`, routesController.getUserRoutes);
router.use(handleError);





module.exports = router;