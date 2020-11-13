const { readFile, writeFile, rm } = require("fs").promises;
const hbs = require("handlebars");
const { tmpdir } = require("os");
const { join } = require("path");
/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 */
async function renderTemplate(data, templateName) {
  const html = await readFile(`${__dirname}/templates/${templateName}.hbs`, "utf-8");

  // creates the Handlebars template object
  const template = hbs.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  await writeFile(join(tmpdir(), "hello.html"), rendered, "utf-8");

  return rendered;
}

/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 * @returns {Promise<{tempPath:string, renderedHtml: string}>}
 */
async function renderTemplateTemp(data, templateName, tempFilename) {
  const html = await readFile(`${__dirname}/templates/${templateName}.hbs`, "utf-8");

  // creates the Handlebars template object
  const template = hbs.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);
  const tempPath = join(tmpdir(), `${tempFilename}.html`);
  await writeFile(tempPath, rendered, "utf-8");

  return { renderedHtml: rendered, tempPath };
}

module.exports = { renderTemplate, renderTemplateTemp };
