const ServicePostgres = require("../services/postgres");
const _servicePg = new ServicePostgres();

const methods = {
  async getAll(request, response) {
    try {
      const sql = "SELECT * FROM roles ";
      let responseDB = await _servicePg.execute(sql);
      let rowCount = responseDB.rowCount;
      let rows = responseDB.rows;

      let responseJSON = {};
      responseJSON.ok = true;
      responseJSON.message = "Roles ok";
      responseJSON.info = rows;
      responseJSON.metainfo = { total: rowCount };
      response.send(responseJSON);
    } catch (error) {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while get roles.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  },
};

module.exports = methods;
