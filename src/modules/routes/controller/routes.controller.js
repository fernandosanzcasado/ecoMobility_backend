const { json } = require('body-parser');


const routesService = require('../service/routes.service');




class routesController{

    async createRoute(req,res,next){
        try{
            await routesService.createRoute(req.user.email, req.body);
            res.json({message: 'Route created sucessfully.'})
        }catch(err){
            next(err);
        }
    }

    async getRoute(req,res,next){
        try{
            const route = await routesService.getRoute(req.params.id, req.user.email);
            res.json(route);
        }catch(err){
            next(err);
        }
    }

    async updateRoute(req,res,next){
        try{
            await routesService.updateRoute(req.params.id,req.user.email, req.body);
            res.json({message: 'Route updated successfully.'});
        }catch(err){
            next(err);
        }
    }

    async getUserRoutes(req,res,next){
        try{
            const userRoutes = await routesService.getUserRoutes(req.user.email);
            res.json(userRoutes);
        }catch(err){
            next(err);
        }
    }



}

module.exports = new routesController();