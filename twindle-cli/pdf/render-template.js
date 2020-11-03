const { readFile } = require("fs").promises;
const hbs = require("handlebars");

// renders the html template with the given data and returns the html string
async function renderTemplate(data, templateName) {
  const html = await readFile(
    `${__dirname}/templates/${templateName}.hbs`,
    "utf-8"
  );

  // creates the Handlebars template object
  const template = hbs.compile(html);

  // renders the html template with the given data
  const rendered = template(data);

  return rendered;
}

module.exports = { renderTemplate };
