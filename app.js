require("dotenv").config();

const express = require("express");

const app = express();

// eslint-disable-next-line no-undef
app.listen(
  process.env.PORT,
  console.log(`Server running on ${process.env.PORT}`)
);
