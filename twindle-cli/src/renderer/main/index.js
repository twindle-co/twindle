require("svelte/register");
const App = require("./components/App.svelte").default;

/**
 * @returns {{html:string;css:{code:string;map:any};head:string}}
 */
function render() {
  return App.render();
}

module.exports = render;
