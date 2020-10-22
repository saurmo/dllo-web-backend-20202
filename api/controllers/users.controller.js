const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const getUsers = async (request, response) => {
  try {
    const sql =
      "SELECT usuarios.*, roles.nombre nombre_rol FROM usuarios INNER JOIN roles ON roles.id = usuarios.rol";
    let responseDB = await _servicePg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;
    rows = rows.map((x) => {
      delete x.clave;
      return x;
    });

    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Users ok";
    responseJSON.info = rows;
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    console.log(error);
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while get user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const saveUser = async (request, response) => {
  try {
    let sql =
      "INSERT INTO public.usuarios (id, tipo_identificacion, nombre, apellido, correo, celular, clave, rol) ";
    sql += " VALUES($1, $2, $3, $4, $5, $6, md5($7), $8);";
    let body = request.body;
    let values = [
      body.id,
      body.identification_type,
      body.firstname,
      body.lastname,
      body.email,
      body.phone,
      body.password,
      body.rol,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "User created";
    responseJSON.info = body;
    response.status(201).send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while create user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};
/**
 *
 * @param {*} request
 * @param {Response} response
 */
const updateUser = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "  UPDATE public.usuarios SET tipo_identificacion=$1, nombre=$2, apellido=$3, correo=$4, celular=$5, rol=$6 WHERE id=$7;";
    let body = request.body;
    let values = [
      body.identification_type,
      body.firstname,
      body.lastname,
      body.email,
      body.phone,
      body.rol,
      id,
    ];
    await _servicePg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "User updated";
    responseJSON.info = body;
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while update user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */
const deleteUser = async (request, response) => {
  try {
    const sql = "DELETE  FROM usuarios WHERE id=$1";
    let id = request.params.id;
    let responseDB = await _servicePg.execute(sql, [id]);
    let rowCount = responseDB.rowCount;
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "Users deleted";
    responseJSON.info = [];
    responseJSON.metainfo = { total: rowCount };
    response.send(responseJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while delete user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { getUsers, saveUser, updateUser, deleteUser };
