// @ts-check
const express = require("express");
const { addThread } = require("./src/add-thread");
const bodyParser = require("body-parser");

const port = 3800;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`API listening at port ${port}`);
});

app.post("/api/add-thread/", addThread);
