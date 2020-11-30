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
  if(src == "twitter")
    return await renderTwitterTemplate(data);
}

async function renderTwitterTemplate(data) {
    const css = await readFile(`${__dirname}/../templates/twitter/style.css`, "utf-8");
  

    const tweetsHtml = await readFile(`${__dirname}/../templates/twitter/Tweets.hbs`, "utf-8");
    const userInfohtml = await readFile(`${__dirname}/../templates/twitter/UserInfo.hbs`, "utf-8");
    const tweethtml = await readFile(`${__dirname}/../templates/twitter/Tweet.hbs`, "utf-8");
    const replyhtml = await readFile(`${__dirname}/../templates/twitter/Reply.hbs`, "utf-8");
  
    hbs.registerPartial('commonUserPartial', userInfohtml);
    hbs.registerPartial('tweetPartial', tweethtml);
    hbs.registerPartial('replyPartial', replyhtml);
  
    const tweetsTemplate = hbs.compile(tweetsHtml, {
        strict: true,
      });
    // renders the html template with the given data
    const threadContent = tweetsTemplate(data.threads);
    
    const tocHtml = await readFile(`${__dirname}/../templates/twitter/Toc.hbs`, "utf-8");

    // creates the Handlebars template object
    const tocTemplate = hbs.compile(tocHtml, {
        strict: true,
    });
    // renders the html template with the given data
    const tocContent = tocTemplate(data.threads);
    
    const tempPath = join(tmpdir(), `Toc.html`);
    await writeFile(tempPath, tocContent, "utf-8");
    console.devLog("toc saved to ", tempPath);

    
    const authors = [];
    for(let thread of data.threads) {
      if(thread.common && thread.common.user && thread.common.user.name)
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

module.exports = { renderTemplate };
