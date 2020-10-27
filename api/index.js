require("./config");
const express = require("express");
const routes = require("./routes/routes");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use(routes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running http://localhost:` + PORT);
});

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJub21icmUiOiJDYXJvbGluYSIsImFwZWxsaWRvIjoiVXJyZWdvIiwiY29ycmVvIjoiY2Fyb2xpbmFAdWRlbS5lZHUuY28
iLCJyb2wiOjEsImlhdCI6MTYwMzc5ODA2NSwiZXhwIjoxNjAzODAxNjY1fQ.
-rA2GIPyUEfsPyTc6X8JiGIJf2L5OiqzN4ElLeQ2Fik

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJub21icmUiOiJDYXJvbGluYSIsImFwZWxsaWRvIjoiVXJyZWdvIiwiY29ycmV
vIjoiY2Fyb2xpbmFAdWRlbS5lZHUuY28iLCJyb2wiOjEsImlhdCI6MTYwMzc5OTY1NSwiZXhwIjoxNjAzODAzMjU1fQ.
S6UQY5tCsuUX4f5pBtfpIPg15kPBX-GaiNy7EKAmBxA