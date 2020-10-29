const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");

// renders the html template with the given data and returns the html string
function renderTemplate(data, templateName) {
	const html = fs.readFileSync(path.join(__dirname, `templates/${templateName}.hbs`), {
		encoding: "utf-8",
	});

	// creates the Handlebars template object
	const template = hbs.compile(html);

	// renders the html template with the given data
	const rendered = template(data);
	return rendered;
}

module.exports = renderTemplate;
