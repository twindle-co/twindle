const express = require("express")
let app = express();
const log = require("debug")("app");
const config = require("./config");

const port = parseInt(process.env.PORT || "5000");

app = config(app);

app.listen(port, () => log(`Express server is running on port: ${port}`));
