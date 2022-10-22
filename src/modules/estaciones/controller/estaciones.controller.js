const estacionesService = require('../service/estaciones.service');

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class estacionesController{

    async findById(req, res) {
        const data = await estacionesService.findById(req.params.Id);
        res.json(data)
    }

    async create(req,res){
        const data = await estacionesService.create(req.body);
        res.json(data);
    }

    /*async update(req, res) {
        const data = await estacionesService.update(req.params.Id, req.body)

        res.json(data)
    }*/

    async deleteByID(req, res) {
        await estacionesService.deleteByID(req.params.Id)

        res.json(`Success`)
    }
}

module.exports = new estacionesController();

