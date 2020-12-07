require("svelte/register");
const App = require("./components/App.svelte").default;
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

/**
 * @param {CustomTweetsObject} threads
 * @returns {{html:string;css:{code:string;map:any};head:string}}
 */
function render({ threads }) {
  return App.render({ threads });
}

/**
 * @param {"epub" | "pdf"} cssFor
 * @returns {string}
 */
function getCSS(cssFor = "") {
  let specific = ""; // css for specific file format
  if (cssFor) {
    const specPath = join(__dirname, "style", cssFor + ".css");
    if (existsSync(specPath)) specific = readFileSync(specPath);
  }

  const main = readFileSync(join(__dirname, "style", "main.css"));
  return main + " " + specific;
}

/**
 * @param {{html:string;head:string}}
 * @returns {string}
 */
function wrapWithHtml({ html, head }) {
  const wrap = `<html>${head}<body>${html}</body></html>`;
  return wrap;
}

module.exports = { render, wrapWithHtml, getCSS };
