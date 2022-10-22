const estacionesRepository = require('../repository/estaciones.repository');

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService{

    async findById(estacionId){
        const data = await estacionesRepository.findById(estacionId);

        if(data){
            return data.Item;
        }
        return data;
    }

    async create(data){
        return await estacionesRepository.createEstacion({
            ID: uuidv4(),
            ACCES: data.ACCES,
            ADREÇA: data.ADREÇA,
            CODIMUN: data.CODIMUN,
            CODIPROV: data.CODIPROV,
            Columna_amb_georeferencia: data.COLUMNA_AMB_GEOREFERENCIA,
            DESIGNACIO_DESCRIPTIVA: data.DESIGNACIO_DESCRIPTIVA,
            id: ID,
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
    }

    /*async update(estacionID, data) {
        return await estacionesRepository.update(estacionID, data);
    }*/

    async deleteByID(estacionID) {
        return await UserRepository.deleteByID(estacionID);
    }

}

module.exports = new estacionesService();