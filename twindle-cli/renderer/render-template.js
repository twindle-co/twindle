import { readFile, writeFile } from "fs/promises";
import handlebars from "handlebars";
import { tmpdir } from "os";

/**
 * Renders the html template with the given data and returns the html string
 * @param {{common: any; thread: any[]}} data
 * @param {string} templateName
 */
async function renderTemplate(data, templateName) {
  const html = await readFile(`${__dirname}/templates/${templateName}.hbs`, "utf-8");

  // creates the Handlebars template object
  const template = handlebars.compile(html, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  await writeFile(`${tmpdir()}/hello.html`, rendered, "utf-8");

  return rendered;
}

export { renderTemplate };
