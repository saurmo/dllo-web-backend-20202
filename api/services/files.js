const fs = require("fs");

module.exports = {
  readSql(folder, file) {
    let path = `api/scripts/${folder}/${file}.sql`;
    let sql = fs.readFileSync(path).toString();
    return sql;
  },
};
