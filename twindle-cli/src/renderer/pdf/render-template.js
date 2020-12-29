// @ts-check
require("svelte/register");
const { writeFile, readFile } = require("fs").promises;
const { render } = require("../main");
const { tmpdir } = require("os");
const { join, resolve } = require("path");

const GithubApp = require("../main/github/components/App.svelte").default;
const MozReadabilityApp = require("../main/article/components/App.svelte").default;
const HackerNewsApp = require("../main/hackernews/components/App.svelte").default;

/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} src
 */
async function renderTemplate(data, src) {
  if (src == "twitter") return await renderTwitterTemplate(data);
  else if (src == "github") return await renderGithubTemplate(data);
  else if (src == "hackernews") return await renderHackernewsTemplate(data);
  else if (src == "article") return await renderArticleTemplate(data);
}

async function renderTwitterTemplate(data) {
  // rendering the svelte component to html
  let { html, css } = render(data);

  html = `<!doctype html> 
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

  const tmpPath = join(tmpdir(), "twitter.html");
  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/twitter.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

async function renderGithubTemplate(data) {
  // @ts-ignore
  let { html, css } = GithubApp.render(data);

  html = `<!doctype html> 
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

  const tmpPath = join(tmpdir(), "github.html");
  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/github.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

async function renderHackernewsTemplate(data) {
  // @ts-ignore
  let { html, css } = HackerNewsApp.render(data);

  // Augment with global CSS
  const globalCSS = await readFile(resolve(__dirname + "/../main/hackernews/style.css"), "utf-8");

  css = `${css.code} \n ${globalCSS}`;

  html = `<!doctype html> 
          <html> 
            <head>
              <meta charset="UTF-8" /
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>${css}</style>
              <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Wellfleet">
            </head>
            <body>
              ${html}
            </body>
          </html>
`;

  const tmpPath = join(tmpdir(), "hackernews.html");
  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/hackernews.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

async function renderArticleTemplate(data) {
  // @ts-ignore
  let { html, css } = MozReadabilityApp.render(data);

  html = `<!doctype html> 
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

  const tmpPath = join(tmpdir(), "readability.html");
  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/readability.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

module.exports = { renderTemplate };
