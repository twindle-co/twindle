// @ts-check
const { render } = require("../main");
const { renderTOC } = require("../main/toc");
const { writeFile, readFile } = require("fs").promises;
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
  // const css = getCSS("epub");

  // renders the html template with the given data
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

  // renders the html template with the given data
  const { html: tocContent } = renderTOC(data);

  const tempPath = join(tmpdir(), `toc.html`);

  await writeFile(tempPath, tocContent, "utf-8");

  console.devLog("toc saved to ", tempPath);

  const authors = [];
  for (let thread of data.threads) {
    if (thread.common && thread.common.user && thread.common.user.name)
      authors.push(thread.common.user.name);
  }
  const authorNames = authors.join(",");
  const optionDetails = {
    title: authorNames + "'s Thread",
    author: authorNames,
    html,
    tocPath: tempPath,
  };
  return optionDetails;
}

async function renderGithubTemplate(data) {
  const css = await readFile(`${__dirname}/../main/github/style.css`, "utf-8");

  const reposHtml = await readFile(`${__dirname}/../main/github/repos-partial.hbs`, "utf-8");
  const userInfohtml = await readFile(`${__dirname}/../main/github/user-info-partial.hbs`, "utf-8");
  const repohtml = await readFile(`${__dirname}/../main/github/repo-partial.hbs`, "utf-8");
  hbs.registerPartial("user-info-partial", userInfohtml);
  hbs.registerPartial("repo-partial", repohtml);

  const reposTemplate = hbs.compile(reposHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const threadContent = reposTemplate(data.threads);

  const tocHtml = await readFile(`${__dirname}/../main/github/toc-template.hbs`, "utf-8");

  // creates the Handlebars template object
  const tocTemplate = hbs.compile(tocHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const tocContent = tocTemplate(data.threads);

  const tempPath = join(tmpdir(), `toc.html`);
  await writeFile(tempPath, tocContent, "utf-8");
  console.devLog("toc saved to ", tempPath);

  const authors = [];
  for (let thread of data.threads) {
    if (thread.common && thread.common.user && thread.common.user.username)
      authors.push(thread.common.username);
  }
  const authorNames = authors.join(",");
  const optionDetails = {
    title: authorNames + "'s Repositories",
    author: authorNames,
    html: threadContent,
    css,
    tocPath: tempPath,
  };
  return optionDetails;
}

async function renderHackernewsTemplate(data) {
  const css = await readFile(`${__dirname}/../main/hackernews/style.css`, "utf-8");

  const articlesHtml = await readFile(
    `${__dirname}/../main/hackernews/articles-partial.hbs`,
    "utf-8"
  );
  const commonInfoHtml = await readFile(
    `${__dirname}/../main/hackernews/common-info-partial.hbs`,
    "utf-8"
  );
  const commentHtml = await readFile(
    `${__dirname}/../main/hackernews/comment-partial.hbs`,
    "utf-8"
  );
  hbs.registerPartial("common-info-partial", commonInfoHtml);
  hbs.registerPartial("comment-partial", commentHtml);
  hbs.registerHelper("levelcalculator", function (comment) {
    if (comment.level - 1 == 0 && comment.index == 0) return "";
    else if (comment.level - 1 == 0 && comment.index != 0) {
      if (comment.comments.length > 0) return "style='page-break-before:always;'";
      else return "style='border-top: 1px solid #ddd;'";
    } else if (comment.level - 1 > 0) return "style='padding-left:35px'";
  });

  const articlesTemplate = hbs.compile(articlesHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const threadContent = articlesTemplate(data.threads);

  const tocHtml = await readFile(`${__dirname}/../main/hackernews/toc-template.hbs`, "utf-8");

  // creates the Handlebars template object
  const tocTemplate = hbs.compile(tocHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const tocContent = tocTemplate(data.threads);

  const tempPath = join(tmpdir(), `toc.html`);
  await writeFile(tempPath, tocContent, "utf-8");
  console.devLog("toc saved to ", tempPath);

  const authors = [];
  for (let thread of data.threads) {
    if (thread.common && thread.common.user && thread.common.user.username)
      authors.push(thread.common.username);
  }
  const authorNames = authors.join(",");
  const optionDetails = {
    title: authorNames + "'s articles",
    author: authorNames,
    html: threadContent,
    css,
    tocPath: tempPath,
  };
  return optionDetails;
}

async function renderArticleTemplate(data) {
  const css = await readFile(`${__dirname}/../main/article/style.css`, "utf-8");
  const articlesHtml = await readFile(`${__dirname}/../main/article/articles-partial.hbs`, "utf-8");

  const articlesTemplate = hbs.compile(articlesHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const threadContent = articlesTemplate(data.threads);

  const tocHtml = await readFile(`${__dirname}/../main/article/toc-template.hbs`, "utf-8");

  // creates the Handlebars template object
  const tocTemplate = hbs.compile(tocHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const tocContent = tocTemplate(data.threads);

  const tempPath = join(tmpdir(), `toc.html`);
  await writeFile(tempPath, tocContent, "utf-8");
  console.devLog("toc saved to ", tempPath);

  const authors = [];
  for (let thread of data.threads) {
    if (thread.author) authors.push(thread.author);
  }
  const authorNames = authors.join(",");
  const optionDetails = {
    title: authorNames + "'s articles",
    author: authorNames,
    html: threadContent,
    tocPath: tempPath,
  };
  return optionDetails;
}
module.exports = { renderTemplate };
