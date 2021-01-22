require("svelte/register");
const TwitterApp = require("./twitter/components/TOC/TOC.svelte").default;
const { createTOC } = require("./twitter/components/TOC/toc");

/**
 * @param {CustomTweetsObject} threads
 * @returns {{html:string;css:{code:string;map:any};head:string}}
 */
function renderTOC({ threads }) {
  const toc = TwitterApp.render({ threads });
  toc.html = createTOC(toc.html);
  return toc;
}

module.exports = { renderTOC };
