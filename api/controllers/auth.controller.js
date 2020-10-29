const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const jwt = require("../services/jwt");

const loginUser = async (request, response) => {
  let responseJSON = {};
  responseJSON.ok = true;
  try {
    const sql =
      "select nombre, apellido, correo, rol from usuarios u where u.id =$1 and clave=md5($2) ";
    let body = request.body;
    let values = [body.id, body.password];
    let responseDB = await _servicePg.execute(sql, values);
    let rowCount = responseDB.rowCount;
    if (rowCount == 1) {
      let user = responseDB.rows[0];
      responseJSON.message = "Users ok";
      responseJSON.info = { token: jwt.createToken(user), rol: user.rol };
      response.send(responseJSON);
    } else {
      responseJSON.ok = false;
      responseJSON.message = "Users not found (Verify id, password)";
      responseJSON.info = [];
      response.status(404).send(responseJSON);
    }
  } catch (error) {
    console.log(error);
    responseJSON.ok = false;
    responseJSON.message = "Error while get user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 */
const validToken = (request, response) => {
  let responseJSON = {};
  responseJSON.ok = true;
  try {
    responseJSON.message = "Users ok";
    responseJSON.info = decodeToken(request);
    response.send(responseJSON);
  } catch (error) {
    responseJSON.ok = false;
    responseJSON.message = "Error while valid token.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {*} next
 */
const middleware = (request, response, next) => {
  try {
    console.log(request.url);
    let token = decodeToken(request);
    request._token = token;
    next();
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while valid middleware.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {*} next
 */
const notFound = (request, response) => {
  let responseJSON = {};
  responseJSON.ok = false;
  responseJSON.message = "Error, endpoint not found";
  responseJSON.info = request.url;
  response.status(404).send(responseJSON);
};

const decodeToken = (request) => {
  let headers = request.headers.authorization.split(" ");
  let token = headers[1];
  return jwt.validToken(token);
};

module.exports = { loginUser, validToken, middleware, notFound };
