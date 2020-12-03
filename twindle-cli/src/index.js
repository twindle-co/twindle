require("./helpers/logger");
require("dotenv").config();
const { getCommandLineObject, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromArray, getTweetsFromUser, getTweetsFromThreads } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");
const { getTweetIDs } = require("./twitter/scraping");
const { UserError } = require("./helpers/error");
const { red, cyan ,bgRed } = require("kleur");
const { formatLogColors } = require("./utils/helpers");

const spinner = require("./spinner");
const { writeFile, mkdir } = require("fs").promises;
const converthtml = require('./github/convert')
const path = require('path');
const { getHtml } = require("./github/githubparse/app");
const cli = require("./cli");

async function main() {
  try {
    prepareCli();
    spinner.start();
    let cliObject = getCommandLineObject();
    //console.log(cliObject);
    const data = await getDataFromSource(cliObject);
    let outputFilename = cliObject.fileName && cliObject.fileName.outputFilename ? 
                          cliObject.fileName.outputFilename : "";
    if(!outputFilename)
      outputFilename = calculateFileName(cliObject, data);
    await writeToMockFile(cliObject, outputFilename, data);

    const outputFilePath = getOutputFilePath(outputFilename, cliObject.format);
    await Renderer.render(data, cliObject.dataSource, cliObject.format, outputFilePath);

    if (cliObject.kindleEmail) {
      console.devLog("sending to kindle", cliObject.kindleEmail);
      await sendToKindle(cliObject.kindleEmail, outputFilePath);
    }

    const [fileName] = outputFilePath.split("/").reverse();

    spinner.succeed(
      "Your " + cyan("data") + " saved into " + formatLogColors[cliObject.format](fileName)
    );
    //console.log("Your " + cyan("tweets") + " are saved into " + formatLogColors[format](fileName));
  } catch (e) {
    if (process.env.DEV === "true") {
      console.error(e);
    } else {
      console.log(`${red(e.name)}: ${e.message}`);
    }
  }

  // If not for this line, the script never finishes
  process.exit();
}

async function getDataFromSource(cliObject) {
  if(cliObject.dataSource) {
    if(cliObject.dataSource === "github")
      return getDataFromGithub(cliObject.github);
    else if(cliObject.dataSource === "twitter")
      return getTweets(cliObject.twitter);
    else if(cliObject.dataSource === "hackernews")
      return getDataFromHackernews(cliObject.hackernews);
  }
  if(cliObject.mock) {
    return getDataFromMock(cliObject.mock);
  }  
}

/**
 *
 * @param {Object} param
 * @param {string} param.tweetId
 * @param {boolean} param.mock
 * @param {boolean} param.shouldUsePuppeteer
 * @param {string} param.userId
 * @param {number} param.numTweets
 */
async function getTweets(cliObject) {
  /** @type {CustomTweetsObject[]} */
  let tweets;

  if (cliObject.userId) {
    tweets = await getTweetsFromUser(cliObject.userId, process.env.TWITTER_AUTH_TOKEN);

    if (tweets[0].data.length > cliObject.numTweets) {
      tweets[0].data = tweets[0].data.slice(0, numTweets);
      tweets[0].common.count = tweets[0].data.length;
    }

    return tweets;
  }

  tweets = await getTweetsFromThreads(cliObject.tweetId, cliObject.includeReplies, process.env.TWITTER_AUTH_TOKEN);
  return tweets;
}


async function getDataFromGithub({githubURL}) {
  return await getHtml(githubURL);
}

function calculateFileName(cliObject, data) {
  const intelligentOutputFileName = `${
    (
      data[0] &&
      data[0].common &&
      data[0].common.user &&
      data[0].common.user.username
    ).replace("@", "") || "twindle"
  }-${
    (data[0] &&  
      data[0].common &&
      data[0].common.created_at.replace(/,/g, "").replace(/ /g, "-")) ||
    "thread"
  }${cliObject.appendToFilename ? "-" + cliObject.appendToFilename : ""}`;
  return intelligentOutputFileName;
}

async function writeToMockFile(cliObject, outputFilename, data) {
  if (cliObject.generateMock) {
    try {
      await mkdir("./generated-mock");
    } catch {}

    // Create mock file with the appropriate name
    await writeFile(
      `./generated-mock/@CUSTOM-OUTPUT_${outputFilename}.json`,
      JSON.stringify(data, null, 2)
    );

  }
}
// Execute it
main();
