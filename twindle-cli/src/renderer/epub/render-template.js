const { readFile, writeFile } = require("fs").promises;
const hbs = require("handlebars");
const { tmpdir } = require("os");
const { join } = require("path");
const { encodeImage } = require("../../utils/image");

/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 */
async function renderTemplate(data, src) {
  if (src == "twitter") return await renderTwitterTemplate(data);
  else if (src == "github") return await renderGithubTemplate(data);
  else if (src == "hackernews") return await renderHackernewsTemplate(data);
  else if (src == "article") return await renderArticleTemplate(data);
}

async function renderTwitterTemplate(data) {
  const css = await readFile(`${__dirname}/../templates/twitter/style.css`, "utf-8");

  const tweetsHtml = await readFile(
    `${__dirname}/../templates/twitter/tweets-partial.hbs`,
    "utf-8"
  );
  const userInfohtml = await readFile(
    `${__dirname}/../templates/twitter/user-info-partial.hbs`,
    "utf-8"
  );
  const tweethtml = await readFile(`${__dirname}/../templates/twitter/tweet-partial.hbs`, "utf-8");
  const replyhtml = await readFile(`${__dirname}/../templates/twitter/reply-partial.hbs`, "utf-8");

  hbs.registerPartial("user-info-partial", userInfohtml);
  hbs.registerPartial("tweet-partial", tweethtml);
  hbs.registerPartial("reply-partial", replyhtml);

  const tweetsTemplate = hbs.compile(tweetsHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const threadContent = tweetsTemplate(data.threads);

  const tocHtml = await readFile(`${__dirname}/../templates/twitter/toc-template.hbs`, "utf-8");

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
    if (thread.common && thread.common.user && thread.common.user.name)
      authors.push(thread.common.user.name);
  }
  const authorNames = authors.join(",");
  const optionDetails = {
    title: authorNames + "'s Thread",
    author: authorNames,
    html: threadContent,
    css,
    tocPath: tempPath,
  };
  return optionDetails;
}

async function renderGithubTemplate(data) {
  const css = await readFile(`${__dirname}/../templates/github/style.css`, "utf-8");

  const reposHtml = await readFile(`${__dirname}/../templates/github/repos-partial.hbs`, "utf-8");
  const userInfohtml = await readFile(
    `${__dirname}/../templates/github/user-info-partial.hbs`,
    "utf-8"
  );
  const repohtml = await readFile(`${__dirname}/../templates/github/repo-partial.hbs`, "utf-8");
  hbs.registerPartial("user-info-partial", userInfohtml);
  hbs.registerPartial("repo-partial", repohtml);

  const reposTemplate = hbs.compile(reposHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const threadContent = reposTemplate(data.threads);

  const tocHtml = await readFile(`${__dirname}/../templates/github/toc-template.hbs`, "utf-8");

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
  const css = await readFile(`${__dirname}/../templates/hackernews/style.css`, "utf-8");

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

  const tocHtml = await readFile(`${__dirname}/../templates/hackernews/toc-template.hbs`, "utf-8");

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
  const css = await readFile(`${__dirname}/../templates/article/style.css`, "utf-8");
  const articlesHtml = await readFile(
    `${__dirname}/../templates/article/articles-partial.hbs`,
    "utf-8"
  );

  const articlesTemplate = hbs.compile(articlesHtml, {
    strict: true,
  });
  // renders the html template with the given data
  const threadContent = articlesTemplate(data.threads);

  const tocHtml = await readFile(`${__dirname}/../templates/article/toc-template.hbs`, "utf-8");

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
    css,
    tocPath: tempPath,
  };
  return optionDetails;
}
module.exports = { renderTemplate };
