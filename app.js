require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

//Setup db and session
require("./config/db.config");
require("./config/session.config")(app);

//Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//express view engine setup
/* eslint-disable no-undef */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
/* eslint-enable no-undef */

//Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/user.routes"));

/* eslint-disable no-undef */
app.listen(
  process.env.PORT,
  console.log(`Server running on ${process.env.PORT}`)
);
/* eslint-enable no-undef */
