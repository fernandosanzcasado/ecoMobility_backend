const ApplicationError = require("../application.error");

class EstacionFaltaLatCoordsError extends ApplicationError {
  constructor(message) {
    super(
      message ||
        "Se ha declarado el parametro 'distancia' pero no se han declarado coordenadas de latitud del usuario",
      400
    );
  }
}
module.exports = EstacionFaltaLatCoordsError;
