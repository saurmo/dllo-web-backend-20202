process.env.NODE_ENV = process.env.NODE_ENV || "dev";

console.log("Enviroment", process.env.NODE_ENV);

if (process.env.NODE_ENV == "dev") {
  process.env.PORT = 3001;
  process.env.USER_DB = "postgres";
  process.env.HOST_DB = "localhost";
  process.env.DB = "el-taller";
  process.env.PASSWORD_DB = "admin";
  process.env.PORT_DB = 5432;
  process.env.URL_DOCS = `http://localhost:${process.env.PORT}/public/`;
} else if (process.env.NODE_ENV == "production") {
  process.env.USER_DB = "";
  process.env.HOST_DB = "";
  process.env.DB = "";
  process.env.PASSWORD_DB = "";
  process.env.PORT_DB = 5432;
}
