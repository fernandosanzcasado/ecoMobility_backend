const ApplicationError = require("../application.error");

class EstacionFaltaLongCoordsError extends ApplicationError {
  constructor(message) {
    super(
      message ||
        "Se ha declarado el parametro 'distancia' pero no se han declarado coordenadas de longitud del usuario",
      400
    );
  }
}
module.exports = EstacionFaltaLongCoordsError;
