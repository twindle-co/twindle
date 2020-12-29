const { readFile, writeFile } = require("fs").promises;
const hbs = require("handlebars");
const { tmpdir } = require("os");
const { join } = require("path");

/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 */
async function renderTemplate(data, templateName) {
  const html = await readFile(`${__dirname}/template/${templateName}.hbs`, "utf-8");

  // creates the Handlebars template object
  const template = hbs.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  const tmpPath = join(tmpdir(), "hello.html");
  await writeFile(tmpPath, rendered, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.log("rendered saved to ", tmpPath);
  return rendered;
  
}
module.exports = { renderTemplate};