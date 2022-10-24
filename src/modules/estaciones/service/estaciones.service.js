const estacionesRepository = require('../repository/estaciones.repository');

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService{

    async scanTable(){
        const data = await estacionesRepository.scanTable();

        if(data){
            return data.Items;
        }
        return data;
    }

    async getTableCoord(){
        const data = await estacionesRepository.getTableCoord();
        if(data){
            return data.Items;
        }
        return data;
    }

    async getTableDir(){
        const data = await estacionesRepository.getTableDir();
        if(data){
            return data.Items;
        }
        return data;
    }
    
    async findById(estacionId){
        const data = await estacionesRepository.findById(estacionId);

        if(data){
            return data.Item;
        }
        return data;
    }

    async getCoordById(estacionId){
        const data = await estacionesRepository.findById(estacionId);

        if(data){
            return [data.Item.ID, data.Item.LATITUD, data.Item.LONGITUD];
        }
        return data;
    }

    async getDirById(estacionId){
        const data = await estacionesRepository.findById(estacionId);

        if(data){
            return [data.Item.ID, data.Item.ADREÇA];
        }
        return data;
    }

    /*async create(data){
        return await estacionesRepository.createEstacion({
            ID: uuidv4(),
            ACCES: data.ACCES,
            ADREÇA: data.ADREÇA,
            CODIPROV: data.CODIPROV,
            Columna_amb_georeferencia: data.COLUMNA_AMB_GEOREFERENCIA,
            DESIGNACIO_DESCRIPTIVA: data.DESIGNACIO_DESCRIPTIVA,
            INDENTIFICADOR: data.INDENTIFICADOR,
            LATITUD: data.LATITUD,
            LONGITUD: data.LONGITUD,
            MUNICIPI: data.MUNICIPI,
            NPLACES_ESTACIO: data.NPLACES_ESTACIO,
            POTENCIA: data.POTENCIA,
            PROMOTOR_GESTOR: data.PROMOTOR_GESTOR,
            PROVINCIA: data.PROVINCIA,
            TIPUS_CONNEXIO: data.TIPUS_CONNEXIO,
            TIPUS_DE_CORRENT: data.TIPUS_DE_CORRENT,
            TIPUS_VEHICLE: data.TIPUS_VEHICLE,
            TIPUS_VELOCITAT: data.TIPUS_VELOCITAT
        });
    }*/

    /*async update(estacionID, data) {
        return await estacionesRepository.update(estacionID, data);
    }*/

    /*async deleteByID(estacionID) {
        return await UserRepository.deleteByID(estacionID);
    }*/

}

module.exports = new estacionesService();