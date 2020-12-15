const { writeFile } = require("fs").promises;
const { render } = require("../main");
const { tmpdir } = require("os");
const { join } = require("path");

/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 */
async function renderTemplate(data, src) {
  if (src === "twitter") return await renderTwitterTemplate(data);
}

async function renderTwitterTemplate(data) {
  // rendering the svelte component to html
  let { html, css } = render(data);

  const tmpPath = join(tmpdir(), "hello.html");

  html = `<!DOCTYPE html> 
          <html> 
            <head>
              <meta charset="UTF-8" /
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>${css.code}</style>
            </head>
            <body>
              ${html}
            </body>
          </html>
`;

  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

module.exports = { renderTemplate };
