const estacionesRepository = require('../repository/estaciones.repository');
const  {v4: uuidv4} = require('uuid');

//fitxer que s'encarrega de tota la logica relacionada amb els usuaris
class estacionesService{

    async scanTable(){
        try{
            const data = await estacionesRepository.scanTable();
            return data.Items;
        }
        catch{
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    }

    async getTableCoord(){
        try{
            const data = await estacionesRepository.getTableCoord();
            return data.Items;
        }
        catch{
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        };
    }

    async getTableDir(){
        try{
            const data = await estacionesRepository.getTableDir();
            return data.Items;
        }
        catch{
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    }
    
    async findById(estacionId){
        try{
            const data = await estacionesRepository.findById(estacionId);
            return data.Item;
        }
        catch{
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    }

    async getCoordById(estacionId){
        try{
            const data = await estacionesRepository.findById(estacionId);
            return [data.Item.ID, data.Item.LATITUD, data.Item.LONGITUD];
        }
        catch{
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    }

    async getDirById(estacionId, res){
        const data = await estacionesRepository.findById(estacionId);
        
        try{
            return [data.Item.ID, data.Item.ADREÇA];
        }
        catch{
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    }

    async postEstacion(params, res){
        const estacion = params;
        estacion.ID = uuidv4();
        estacion.ACCES = "";
        estacion.CODIMUN = "bbbbbbbbbbbbbbbb";
        estacion.ADREÇA=params.ADREÇA;
        console.log(estacion.ADREÇA);
        try {
            const newEstacion = await estacionesRepository.addOrUpdateCharacter(estacion);
            res.json(newEstacion);
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
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

    async deleteByID(estacionID) {
        try{
            return await estacionesRepository.deleteByID(estacionID);
    
        }
        catch (err){
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    }
}

module.exports = new estacionesService();