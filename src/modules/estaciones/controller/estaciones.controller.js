const estacionesService = require('../service/estaciones.service');

//fitxer que s'encarrega de gestiona les request i responses dels usuaris
class estacionesController{


    async scanTable(req, res) {
        const data = await estacionesService.scanTable();
        res.json(data)
    }

    async getTableCoord(req, res) {
        const data = await estacionesService.getTableCoord();
        res.json(data)
    }

    async getTableDir(req, res) {
        const data = await estacionesService.getTableDir();
        res.json(data)
    }

    async findById(req, res) {
        const data = await estacionesService.findById(req.params.Id);
        res.json(data)
    }

    async getCoordById(req, res) {
        const data = await estacionesService.getCoordById(req.params.Id);
        res.json(data)
    }

    async getDirById(req, res) {
        const data = await estacionesService.getDirById(req.params.Id);
        res.json(data)
    }

    async create(req,res){
        const data = await estacionesService.postEstacion(req.body);
        res.json(data);
    }

    async update(req, res) {
        const data = await estacionesService.update(req.params.Id, req.body)
        res.json(data)
    }

    async deleteByID(req, res) {
        await estacionesService.deleteByID(req.params.Id);
        res.json(`Success`)
    }
}

module.exports = new estacionesController();

