require("svelte/register");
const App = require("./components/TOC/TOC.svelte").default;
const { createTOC } = require("./components/TOC/toc");

/**
 * @param {CustomTweetsObject} threads
 * @returns {{html:string;css:{code:string;map:any};head:string}}
 */
function renderTOC({ threads }) {
  const toc = App.render({ threads });
  toc.html = createTOC(toc.html);
  return toc;
}

module.exports = { renderTOC };
