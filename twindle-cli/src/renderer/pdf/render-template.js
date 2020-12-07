const { writeFile } = require("fs").promises;
const { render } = require("../main");
const { tmpdir } = require("os");
const { join } = require("path");
/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 */
async function renderTemplate(data, src) {
  if (src == "twitter") return await renderTwitterTemplate(data);
}

async function renderTwitterTemplate(data) {
  // rendering the svelte component to html
  const { html } = render(data);

  const tmpPath = join(tmpdir(), "hello.html");
  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

module.exports = { renderTemplate };
