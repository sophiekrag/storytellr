require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");

require("./config/db.config");

const app = express();

app.use(logger("dev"));

// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//Routes
app.use("/", require("./routes/index"));

/* eslint-disable no-undef */
app.listen(
  process.env.PORT,
  console.log(`Server running on ${process.env.PORT}`)
);
/* eslint-enable no-undef */
