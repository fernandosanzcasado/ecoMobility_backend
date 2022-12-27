const s3 = require('../helpers/S3');
const { json } = require('body-parser');

//fitxer que s'encarrega de gestionar operacions a la base de dades de la taula usuaris(ex:crear objectes, fer update dels objectes,
//borrar objectes o fer un get dels objectes).
class BLOBsRepository{

    constructor(){
        this.bucket = 'ecomobilityblobs'
    }

    async uploadImage(path, data, mimeType){
        const params = {
            Bucket: this.bucket, 
            Key: path, 
            Body: data,
            ContentType: mimeType
        };
        return s3.upload(params).promise();

    }

    async getImage(path){
        const params = {
            Bucket: this.bucket, 
            Key: path, 
        };
        return s3.getObject(params).promise();
    }

}

module.exports = new BLOBsRepository();
