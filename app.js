require("dotenv").config();

const express = require("express");

require("./config/db.config");

const app = express();

/* eslint-disable no-undef */
app.listen(
  process.env.PORT,
  console.log(`Server running on ${process.env.PORT}`)
);
/* eslint-enable no-undef */
