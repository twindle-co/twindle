const { render, getCSS } = require("../main");
const { writeFile } = require("fs").promises;
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
  const css = getCSS("epub");

  // renders the html template with the given data
  const { html } = render(data);
  console.log(html);
  // renders the html template with the given data
  const tocContent = ""; //renderTOC(data);

  const tempPath = join(tmpdir(), `toc.html`);
  await writeFile(tempPath, tocContent, "utf-8");
  console.devLog("toc saved to ", tempPath);

  const authors = [];
  for (let thread of data.threads) {
    if (thread.common && thread.common.user && thread.common.user.name)
      authors.push(thread.common.user.name);
  }
  const authorNames = authors.join(",");
  const optionDetails = {
    title: authorNames + "'s Thread",
    author: authorNames,
    html: html,
    css,
    tocPath: tempPath,
  };
  return optionDetails;
}

module.exports = { renderTemplate };
