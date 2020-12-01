const render = require("./index");
const fs = require("fs");
const mock = require("../../../generated-mock/mock.json");

const { html } = render({ threads: mock });
const wrap = `<html><body>${html}</body></html>`;
fs.writeFileSync(__dirname + "/output.html", wrap);
