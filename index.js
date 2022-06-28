const winston = require("winston");
const express   = require('express');
const app       = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validate")();
require("./startup/prod")(app);

const port = process.env.PORT || 9000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;