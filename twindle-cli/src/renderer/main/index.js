// @ts-check
require("svelte/register");
const twitterApp = require("./twitter/components/App.svelte").default;
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

/**
 * @param {CustomTweetsObject} threads
 * @returns {{html:string;css:{code:string;map:any};head:string}}
 */
function render({ threads }) {
  // @ts-ignore
  return twitterApp.render({ threads });
}

/**
 * @param {{html:string;head:string}}
 * @returns {string}
 */
function wrapWithHtml({ html, head }) {
  const wrap = `<html>${head}<body>${html}</body></html>`;
  return wrap;
}

module.exports = { render, wrapWithHtml };
