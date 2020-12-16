// @ts-check
const { writeFile, readFile } = require("fs").promises;
const { render } = require("../main");
const { tmpdir } = require("os");
const { join } = require("path");
const hbs = require("handlebars");

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

  const tmpPath = join(tmpdir(), "hello.html");
  await writeFile(tmpPath, html, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return html;
}

async function renderGithubTemplate(data) {
  const threadsHtml = await readFile(
    `${__dirname}/../templates/github/threads-template.hbs`,
    "utf-8"
  );
  const reposHtml = await readFile(`${__dirname}/../templates/github/repos-partial.hbs`, "utf-8");
  const userInfohtml = await readFile(
    `${__dirname}/../templates/github/user-info-partial.hbs`,
    "utf-8"
  );
  const repoHtml = await readFile(`${__dirname}/../templates/github/repo-partial.hbs`, "utf-8");
  const css = await readFile(`${__dirname}/../templates/github/style.css`, "utf-8");

  hbs.registerPartial("repos-partial", reposHtml);
  hbs.registerPartial("user-info-partial", userInfohtml);
  hbs.registerPartial("repo-partial", repoHtml);
  hbs.registerPartial("style", css);

  // creates the Handlebars template object
  const template = hbs.compile(threadsHtml, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  const tmpPath = join(tmpdir(), "hello.html");
  await writeFile(tmpPath, rendered, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return rendered;
}

async function renderHackernewsTemplate(data) {
  const threadsHtml = await readFile(
    `${__dirname}/../templates/hackernews/threads-template.hbs`,
    "utf-8"
  );
  const articlesHtml = await readFile(
    `${__dirname}/../templates/hackernews/articles-partial.hbs`,
    "utf-8"
  );
  const commonInfoHtml = await readFile(
    `${__dirname}/../templates/hackernews/common-info-partial.hbs`,
    "utf-8"
  );
  const commentHtml = await readFile(
    `${__dirname}/../templates/hackernews/comment-partial.hbs`,
    "utf-8"
  );
  const css = await readFile(`${__dirname}/../templates/hackernews/style.css`, "utf-8");

  hbs.registerPartial("articles-partial", articlesHtml);
  hbs.registerPartial("common-info-partial", commonInfoHtml);
  hbs.registerPartial("comment-partial", commentHtml);
  hbs.registerPartial("style", css);
  hbs.registerHelper("levelcalculator", function (comment) {
    if (comment.level - 1 == 0 && comment.index == 0) return "";
    else if (comment.level - 1 == 0 && comment.index != 0) {
      if (comment.comments.length > 0) return "style='page-break-before:always;'";
      else return "style='border-top: 1px solid #ddd;'";
    } else if (comment.level - 1 > 0) return "style='padding-left:35px'";
  });

  // creates the Handlebars template object
  const template = hbs.compile(threadsHtml, {
    strict: true,
  });

  // renders the html template with the given data
  const rendered = template(data);

  const tmpPath = join(tmpdir(), "hello.html");
  await writeFile(tmpPath, rendered, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return rendered;
}

async function renderArticleTemplate(data) {
  const threadsHtml = await readFile(
    `${__dirname}/../templates/article/threads-template.hbs`,
    "utf-8"
  );
  const css = await readFile(`${__dirname}/../templates/article/style.css`, "utf-8");
  const articlesHtml = await readFile(
    `${__dirname}/../templates/article/articles-partial.hbs`,
    "utf-8"
  );

  hbs.registerPartial("style", css);
  hbs.registerPartial("articles-partial", articlesHtml);
  // creates the Handlebars template object
  const template = hbs.compile(threadsHtml, {
    strict: true,
  });
}

module.exports = { renderTemplate };
