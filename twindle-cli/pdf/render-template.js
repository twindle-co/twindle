const { readFile } = require("fs").promises;
const hbs = require("handlebars");

/**
 * Replaces `\n` with `<br />`
 * @param {string} tweet
 */
function fixLineBreaks(tweet) {
  return tweet.replace(/\n/g, "<br />");
}

/**
 * Renders the html template with the given data and returns the html string
 * @param {{thread: any[]}} data
 * @param {string} templateName
 */
async function renderTemplate(data, templateName) {
  console.log(data.thread[0]);
  for (let i = 0; i < data.thread.length; i++) {
    data.thread[i].tweet = fixLineBreaks(data.thread[i].tweet);
  }
  
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
