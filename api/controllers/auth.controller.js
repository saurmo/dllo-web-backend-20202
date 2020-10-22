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
      responseJSON.info = jwt.createToken(user);
      response.send(responseJSON);
    } else {
      responseJSON.message = "Users not found (Verify id, password)";
      responseJSON.info = [];
      response.send(responseJSON);
    }
  } catch (error) {
    console.log(error);
    responseJSON.ok = false;
    responseJSON.message = "Error while get user.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const validToken = (request, response) => {
  let responseJSON = {};
  responseJSON.ok = true;
  try {
    let headers = request.headers.authorization.split(" ");
    let token = headers[1];
    responseJSON.message = "Users ok";
    responseJSON.info = jwt.validToken(token);
    response.send(responseJSON);
  } catch (error) {
    responseJSON.ok = false;
    responseJSON.message = "Error while valid token.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

module.exports = { loginUser, validToken };
