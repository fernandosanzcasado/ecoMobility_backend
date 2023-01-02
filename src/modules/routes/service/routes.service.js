const routesRepository = require('../repository/routes.repository');
const { v4: uuidv4 } = require("uuid");


class routesService{

    async createRoute(email, data){
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
        return route.Item;
    }

    async updateRoute(id,email,data){
        const CO2 = data.km * 222.45 - data.km * 5.04
        await routesRepository.updateRoute(id, email,{
            km: data.km,
            CO2: CO2,  
        });
        return;
    }






}

module.exports = new routesService();