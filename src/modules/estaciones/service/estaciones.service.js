const estacionesRepository = require('../repository/estaciones.repository');
const  {v4: uuidv4} = require('uuid');

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService{

    async scanTable(){
        const data = await estacionesRepository.scanTable();
        return data.Items;
    }

    async getTableCoord(){
        const data = await estacionesRepository.getTableCoord();
        return data.Items;
    }

    async getTableDir(){
        const data = await estacionesRepository.getTableDir();
        return data.Items;
    }
    
    async findById(estacionId){
        const data = await estacionesRepository.findById(estacionId);
        return data.Item;
    }

    async getCoordById(estacionId){
        const data = await estacionesRepository.findById(estacionId);
        return [data.Item.ID, data.Item.LATITUD, data.Item.LONGITUD];
    }

    async getDirById(estacionId){
        const data = await estacionesRepository.findById(estacionId);
        return [data.Item.ID, data.Item.ADREÇA];
    }

    async postEstacion(data){
        const estacion = data;
        estacion.ID = uuidv4();
        const newEstacion = await estacionesRepository.postOrUpdateEstacion(estacion);
        return newEstacion;
    }
    
    async update(estacionID, data) {
        const estacion = data;
        estacion.ID= estacionID;
        const updatedEst = await estacionesRepository.postOrUpdateEstacion(estacion);
        return updatedEst;
    }

    async deleteByID(estacionID) {
        return await estacionesRepository.deleteByID(estacionID);
    }
}

module.exports = new estacionesService();