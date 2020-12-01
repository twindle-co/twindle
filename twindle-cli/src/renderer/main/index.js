require("svelte/register");
const App = require("./components/App.svelte").default;

/**
 * @param {CustomTweetsObject} threads
 * @returns {{html:string;css:{code:string;map:any};head:string}}
 */
function render({ threads }) {
  return App.render({ threads });
}

module.exports = render;
