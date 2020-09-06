const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./api/v1/index");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.listen(PORT, console.log(`server is running on port ${PORT}`));
