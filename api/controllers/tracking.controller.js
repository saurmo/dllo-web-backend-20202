const ServicePostgres = require("../services/postgres");
const { readSql } = require("../services/files");
const { success, error } = require("./response");
const _servicePg = new ServicePostgres();

const FOLDER_SQL = "tracking";

const getTrackings = async (request, response) => {
  try {
    const sql = "SELECT * FROM seguimientos ";
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Trackings ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while get user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const getTrackingsByMotorcycle = async (request, response) => {
  try {
    let id_motorcycle = request.params.id_motorcycle;
    let sql = readSql(FOLDER_SQL, "get-tracking-by-motorcycle");
    let values = [id_motorcycle];
    let info = await _servicePg.execute(sql, values);
    return success(response, { message: "Ok tracking", info: info.rows });
  } catch (er) {
    return error(response, { message: "Error get tracking", info: er });
  }
};

/**
 *
 * @param {Request} request
 * @param {*} response
 */
const saveTracking = async (request, response) => {
  try {
    let sql =
      "INSERT INTO public.seguimientos (id_mecanico, placa, fecha, mano_obra, repuestos, horas)";
    sql += " VALUES($1, $2, now(), $3, $4, $5);";

    let body = request.body;
    let values = [
      body.id_mecanico,
      body.placa,
      body.mano_obra,
      body.repuestos,
      body.horas,
    ];
    await _servicePg.execute(sql, values);

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Tracking created";
    responseJSON.info = {};
    response.status(201).send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while create user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 *
 * @param {Request} request
 * @param {*} response
 */
const saveImageTracking = async (request, response) => {
  try {
    let archivo = request.files.fileUpload;
    let name = archivo.name;
    let ext = name.split(".");

    ext = ext[ext.length - 1];

    if (ext === "xlsx") {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "File no accepted. [xlsx]";
      responseJSON.info = archivo.name;
      response.send(responseJSON);
    } else {
      await archivo.mv("docs/" + archivo.name);
      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "File uploaded";
      responseJSON.info = archivo.name;
      response.send(responseJSON);
    }
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while create image tracking.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = {
  saveTracking,
  getTrackings,
  saveImageTracking,
  getTrackingsByMotorcycle,
};
