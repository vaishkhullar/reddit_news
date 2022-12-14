const express = require("express");
require("jest-sorted");

const apiRouter = require("./routers/api.router");

const app = express();
//parsing the body
app.use(express.json());

//router
app.use("/api", apiRouter);

//error handling

app.use("/*", (req, res) => {
  res.status(400).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
