const fs = require("fs");
const prettier = require("prettier");

/**
 * @param {string} html
 * @returns {string}
 */
function createTOC(html) {
  /**@type {string} */
  const toc = fs.readFileSync(__dirname + "/toc.html").toString();

  const prettied = prettier.format(toc.replace("REPLACE", html), {
    parser: "html",
  });
  return prettied;
}
module.exports = { createTOC };
