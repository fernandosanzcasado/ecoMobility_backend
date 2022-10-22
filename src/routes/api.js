const userController = require('../modules/user/controller/user.controller');
const estacionesController = require('../modules/estaciones/controller/estaciones.controller');


module.exports = async(app) =>{
    app.get(`/api/v1/users/:Id`, userController.findById);
    app.post(`/api/v1/users`, userController.create);
    app.get(`/api/v1/estaciones/:ID`, estacionesController.findById);
    app.delete(`/api/v1/estaciones(:ID)`, estacionesController.deleteByID);
    app.post(`/api/v1/estaciones`, estacionesController.create);
};