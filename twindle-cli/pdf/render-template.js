const { readFileSync } = require("fs");
const hbs = require("handlebars");

// renders the html template with the given data and returns the html string
function renderTemplate(data, templateName) {
  const html = readFileSync(
    `${__dirname}/templates/${templateName}.hbs`,
    "utf-8"
  );

  // creates the Handlebars template object
  const template = hbs.compile(html);

  // renders the html template with the given data
  const rendered = template(data);

  console.log(rendered);
  return rendered;
}

module.exports = { renderTemplate };
