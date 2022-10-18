const express = require('express')
const app = express();

const PORT = 8000;

const bodyParser = require('body-parser');

const createServer = async() => {
    app.use(bodyParser.json());

    //rutes
    require('./src/routes/api')(app);

    app.listen(PORT,() =>{
        console.log('App listening at http://localhost:${PORT}')
    })

};

module.exports = {
    createServer
}