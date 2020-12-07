const { render, wrapWithHtml } = require("./index");
const fs = require("fs");
const mock = require("../../../generated-mock/mock.json");

const data = render({ threads: mock });
const wrap = wrapWithHtml(data);

fs.writeFileSync(__dirname + "/output.html", wrap);
