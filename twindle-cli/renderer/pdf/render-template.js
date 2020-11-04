const { readFile } = require("fs").promises;
const hbs = require("handlebars");
const { fixLineBreaks } = require("../../twitter/utils/tweet-utils");

/**
 * Renders the html template with the given data and returns the html string
 * @param {{thread: any[]}} data
 * @param {string} templateName
 */
async function renderTemplate(data, templateName) {
  const html = await readFile(
    `${__dirname}/templates/${templateName}.hbs`,
    "utf-8"
  );

  // creates the Handlebars template object
  const template = hbs.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  return rendered;
}

module.exports = { renderTemplate };
