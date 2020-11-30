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
}

async function renderTwitterTemplate(data) {
  console.log(`${__dirname}`);
  const threadsHtml = await readFile(`${__dirname}/../templates/twitter/Threads.hbs`, "utf-8");
  const tweetsHtml = await readFile(`${__dirname}/../templates/twitter/Tweets.hbs`, "utf-8");
  const userInfohtml = await readFile(`${__dirname}/../templates/twitter/UserInfo.hbs`, "utf-8");
  const tweethtml = await readFile(`${__dirname}/../templates/twitter/Tweet.hbs`, "utf-8");
  const replyhtml = await readFile(`${__dirname}/../templates/twitter/Reply.hbs`, "utf-8");
  const css = await readFile(`${__dirname}/../templates/twitter/style.css`, "utf-8");

  // creates the Handlebars template object
  const template = hbs.compile(threadsHtml, {
    strict: true,
  });
  hbs.registerPartial('tweetsPartial', tweetsHtml);
  hbs.registerPartial('commonUserPartial', userInfohtml);
  hbs.registerPartial('tweetPartial', tweethtml);
  hbs.registerPartial('replyPartial', replyhtml);
  hbs.registerPartial('cssPartial', css);
  

  // renders the html template with the given data
  const rendered = template(data);

  const tmpPath = join(tmpdir(), "hello.html");
  await writeFile(tmpPath, rendered, "utf-8");
  await writeFile(tmpdir() + "/x.json", JSON.stringify(data, null, 2), "utf-8");
  console.devLog("rendered saved to ", tmpPath);
  return rendered;
}

module.exports = { renderTemplate };
