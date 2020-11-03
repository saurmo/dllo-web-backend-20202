const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const methods = {
  async getMotorcycles(request, response) {
    try {
      const sql = "SELECT * FROM motos ";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;

      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Motorcycles ok";
      responseJSON.info = rows;
      responseJSON.metainfo = { total: rowCount };
      response.send(responseJSON);
    } catch (error) {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while get motorcycle.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },

  async saveMotorcycle(request, response) {
    try {
      let sql =
        "INSERT INTO public.motos (placa, id_propietario, modelo, marca, color, cilindraje, nro_tecnomecanica, vencimiento_tecnomecanica, nro_soat, vencimiento_soat, nro_matricula, estado, imagen) ";
      sql += " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);";
      let body = request.body;
      let values = [
        body.placa,
        body.id_propietario,
        body.modelo,
        body.marca,
        body.color,
        body.cilindraje,
        body.nro_tecnomecanica,
        body.vencimiento_tecnomecanica,
        body.nro_soat,
        body.vencimiento_soat,
        body.nro_matricula,
        body.estado,
        body.imagen,
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Motorcycle created";
      responseJSON.info = body;
      response.status(201).send(responseJSON);
    } catch (error) {
      console.log(error);
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while create motorcycle.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },

  /**
   *
   * @param {Request} request
   * @param {*} response
   */
  async saveImage(request, response) {
    try {
      let archivo = request.files.imagen;
      await archivo.mv("docs/" + archivo.name);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "File uploaded";
      responseJSON.info = archivo.name;
      response.send(responseJSON);
    } catch (error) {
      console.log(error);
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while create image tracking.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },
  async updateMotorcycle(request, response) {
    try {
      let placa = request.params.id;
      let sql =
        "UPDATE public.motos SET id_propietario=$1, modelo=$2, marca=$3, color=$4, cilindraje=$5, nro_tecnomecanica=$6, vencimiento_tecnomecanica=$7, nro_soat=$8, vencimiento_soat=$9, nro_matricula=$10, estado=$11, imagen=$12 WHERE placa=$13;";
      let body = request.body;
      let values = [
        body.id_propietario,
        body.modelo,
        body.marca,
        body.color,
        body.cilindraje,
        body.nro_tecnomecanica,
        body.vencimiento_tecnomecanica,
        body.nro_soat,
        body.vencimiento_soat,
        body.nro_matricula,
        body.estado,
        body.imagen,
        placa,
      ];
      await _servicePg.execute(sql, values);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Motorcycle updated";
      responseJSON.info = body;
      response.send(responseJSON);
    } catch (error) {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while update motorcycle.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },

  async deleteMotorcycle(request, response) {
    try {
      const sql = "DELETE  FROM motos WHERE placa=$1";
      let placa = request.params.id;
      let responseDB = await _servicePg.execute(sql, [placa]);
      let rowCount = responseDB.rowCount;
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Motorcycle deleted";
      responseJSON.info = [];
      responseJSON.metainfo = { total: rowCount };
      response.send(responseJSON);
    } catch (error) {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while delete motorcycle.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },
};

module.exports = methods;
