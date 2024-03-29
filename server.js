const cors = require("cors");
const express = require("express");
const app = express();
require('dotenv').config();

let corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes/index");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});