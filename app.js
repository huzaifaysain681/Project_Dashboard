var createError = require("http-errors");
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const config = require("./services/config");
var passport = require("passport");
const errorHandler = require("./midelwares/Error");

var indexRouter = require("./routes/index");

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("***DB Connected!***"); //Connection With Server
  },
  (err) => {
    console.log(err);
  }
);
var app = express();
app.use(cors());
app.use(express.static("admin/build"));
app.use(passport.initialize());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/", express.static(path.join("public/")));
app.use("/api/v1", indexRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "admin/build", "index.html"));
});
// catch 404 and forward to error handler

app.use(errorHandler);

const port = process.env.PORT || 3000; // Use the environment port if available, otherwise use port 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
