const { v4: uuidv4 } = require("uuid");

const routesRepository = require('../repository/routes.repository');
const RouteInCourse = require('../../../errors/routes.errors/routeInCourse');
const RouteNotFound = require("../../../errors/routes.errors/routeNotFound");
const RouteAlreadyFinished = require("../../../errors/routes.errors/routeAlreadyFinished");
const userService = require("../../user/service/user.service");




class routesService{

    async createRoute(email, data){

        const lastRoute = await routesRepository.getLastRoute(email);

        if(lastRoute.Count > 0 && lastRoute.Items[0].endingDate == null){
            throw new RouteInCourse();
        }

        const id = uuidv4();
        
        const separatedStartingCoords = data.startingCoords.split(",");
        const separatedEndigCoords = data.endingCoords.split(",");
        
        await routesRepository.createRoute(id, email, {
            latIni : separatedStartingCoords[0], 
            longIni: separatedStartingCoords[1].trim(), 
            latEnd: separatedEndigCoords[0], 
            longEnd: separatedEndigCoords[1].trim(), 
            vehicle: data.vehicle
        });
        return;
    }

    async getRoute(id,email){
        const route = await routesRepository.getRoute(id,email);

        if(!route.Item){
            throw new RouteNotFound();
        }

        return route.Item;
    }

    async updateRoute(id,email,data){

        const routeToUpdate = await this.getRoute(id,email);

        if(routeToUpdate.endingDate != null){
            throw new RouteAlreadyFinished();
        }


        const CO2 = data.km * 222.45 - data.km * 5.04
        await routesRepository.updateRoute(id, email,{
            km: data.km,
            CO2: CO2,  
        });
        const ecoPoints = parseInt(0.01*(CO2 * 1.15),10);
        await userService.addEcoPoints(email,ecoPoints);
        return;
    }

    async getUserRoutes(email){
        return await routesRepository.getUserRoutes(email);
    }






}

module.exports = new routesService();