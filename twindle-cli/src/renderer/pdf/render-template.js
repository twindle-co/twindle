const { readFile, writeFile } = require("fs").promises;
const hbs = require("handlebars");
const { tmpdir } = require("os");
const { join } = require("path");
/**
 * Renders the html template with the given data and returns the html string
 * @param {CustomTweetsObject} data
 * @param {string} templateName
 */
async function renderTemplate(data, src) {
  if(src == "twitter")
    return await renderTwitterTemplate(data);
  else if(src == "github")
    return await renderGithubTemplate(data);
}

async function renderTwitterTemplate(data) {
  const threadsHtml = await readFile(`${__dirname}/../templates/twitter/threads-template.hbs`, "utf-8");
  const tweetsHtml = await readFile(`${__dirname}/../templates/twitter/tweets-partial.hbs`, "utf-8");
  const userInfohtml = await readFile(`${__dirname}/../templates/twitter/user-info-partial.hbs`, "utf-8");
  const tweethtml = await readFile(`${__dirname}/../templates/twitter/tweet-partial.hbs`, "utf-8");
  const replyhtml = await readFile(`${__dirname}/../templates/twitter/reply-partial.hbs`, "utf-8");
  const css = await readFile(`${__dirname}/../templates/twitter/style.css`, "utf-8");

  hbs.registerPartial('tweets-partial', tweetsHtml);
  hbs.registerPartial('user-info-partial', userInfohtml);
  hbs.registerPartial('tweet-partial', tweethtml);
  hbs.registerPartial('reply-partial', replyhtml);
  hbs.registerPartial('style', css);
  
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

async function renderGithubTemplate(data) {
  const threadsHtml = await readFile(`${__dirname}/../templates/github/threads-template.hbs`, "utf-8");
  const reposHtml = await readFile(`${__dirname}/../templates/github/repos-partial.hbs`, "utf-8");
  const userInfohtml = await readFile(`${__dirname}/../templates/github/user-info-partial.hbs`, "utf-8");
  const repoHtml = await readFile(`${__dirname}/../templates/github/repo-partial.hbs`, "utf-8");
  const css = await readFile(`${__dirname}/../templates/github/style.css`, "utf-8");

  hbs.registerPartial('repos-partial', reposHtml);
  hbs.registerPartial('user-info-partial', userInfohtml);
  hbs.registerPartial('repo-partial', repoHtml);
  hbs.registerPartial('style', css);
  
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

module.exports = { renderTemplate };
