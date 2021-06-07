require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

//setup database
require("./config/db.config");

const app = express();

app.use(logger("dev"));

//express view engine setup
// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth.routes");

//Routes middleware
app.use("/", indexRouter);
app.use("/", authRouter);

/* eslint-disable no-undef */
app.listen(
  process.env.PORT,
  console.log(`Server running on ${process.env.PORT}`)
);
/* eslint-enable no-undef */
