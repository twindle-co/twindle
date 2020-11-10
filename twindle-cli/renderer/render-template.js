const { readFile, writeFile } = require("fs").promises;
const hbs = require("handlebars");
const { tmpdir } = require("os");

/**
 * Renders the html template with the given data and returns the html string
 * @param {{common: any; thread: any[]}} data
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

  await writeFile(`${tmpdir()}/hello.html`, rendered, "utf-8");

  return rendered;
}

module.exports = { renderTemplate };
