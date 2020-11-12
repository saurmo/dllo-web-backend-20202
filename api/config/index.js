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
  process.env.USER_DB = "snhngbaxlxaurw";
  process.env.HOST_DB = "ec2-3-216-89-250.compute-1.amazonaws.com";
  process.env.DB = "d2s3e228cu1fnh";
  process.env.PASSWORD_DB =
    "dddba8dcbc194ea4d1d64dbd0fecbd080da45fd40ffc62299f33469abe64184a";
  process.env.PORT_DB = 5432;
}
