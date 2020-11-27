require("./helpers/logger");
require("dotenv").config();
const { getCommandlineArgs, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromArray, getTweetsFromUser, getTweetsFromThreads } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");
const { getTweetIDs } = require("./twitter/scraping");
const { UserError } = require("./helpers/error");
const { red, cyan ,bgRed } = require("kleur");
const { formatLogColors } = require("./utils/helpers");
const { isValidEmail } = require("./utils/helpers");
const spinner = require("./spinner");
const { writeFile, mkdir } = require("fs").promises;
const converthtml = require('./github/convert')
const path = require('path')

async function main() {
  prepareCli();

  spinner.start();

  const {
    format,
    outputFilename,
    tweetId,
    includeReplies,
    kindleEmail,
    mock,
    shouldUsePuppeteer,
    appendToFilename,
    userId,
    numTweets,
    generateMock,
    gitHubURL
  } = getCommandlineArgs(process.argv);
  let dataSrc = "";
  if(gitHubURL){
    dataSrc = "github";
    const giturl = new URL(gitHubURL)
    const urlExtension = path.extname(giturl.pathname)
    if(urlExtension !== ".md"){
    return spinner.fail(bgRed("Please enter another URL having markdown extension(.md)"));
    }
    
    return spinner.succeed(`Your ${cyan('files')} are saved into ${formatLogColors[format](converthtml(gitHubURL))}`)
  }

  try {
    verifyEnvironmentVariables(kindleEmail);

    const tweets = await getTweets({ tweetId, includeReplies, mock, shouldUsePuppeteer, userId, numTweets });
    if(tweets.length > 0)
      dataSrc = "twitter";
    const intelligentOutputFileName = `${
      (
        tweets[0] &&
        tweets[0].common &&
        tweets[0].common.user &&
        tweets[0].common.user.username
      ).replace("@", "") || "twindle"
    }-${
      (tweets[0] &&  
        tweets[0].common &&
        tweets[0].common.created_at.replace(/,/g, "").replace(/ /g, "-")) ||
      "thread"
    }${appendToFilename ? "-" + appendToFilename : ""}`;

    if (generateMock) {
      try {
        await mkdir("./generated-mock");
      } catch {}

      // Create mock file with the appropriate name
      await writeFile(
        `./generated-mock/@CUSTOM-OUTPUT_${intelligentOutputFileName}.json`,
        JSON.stringify(tweets, null, 2)
      );

    }

    const outputFilePath = getOutputFilePath(outputFilename || intelligentOutputFileName, format);
    await Renderer.render(tweets, dataSrc, format, outputFilePath);

    if (process.argv.includes("-s")) {
      console.devLog("sending to kindle", kindleEmail);
      await sendToKindle(kindleEmail, outputFilePath);
    }

    const [fileName] = outputFilePath.split("/").reverse();

    spinner.succeed(
      "Your " + cyan("tweets") + " are saved into " + formatLogColors[format](fileName)
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

/**
 *
 * @param {Object} param
 * @param {string} param.tweetId
 * @param {boolean} param.mock
 * @param {boolean} param.shouldUsePuppeteer
 * @param {string} param.userId
 * @param {number} param.numTweets
 */
async function getTweets({ tweetId, includeReplies, mock, shouldUsePuppeteer, userId, numTweets }) {
  /** @type {CustomTweetsObject[]} */
  let tweets;

  if (mock) {
    tweets = require("./twitter/mock/twitter-mock-responses/only-links.json");
    return tweets;
  }

  if (userId) {
    tweets = await getTweetsFromUser(userId, process.env.TWITTER_AUTH_TOKEN);

    if (tweets[0].data.length > numTweets) {
      tweets[0].data = tweets[0].data.slice(0, numTweets);
      tweets[0].common.count = tweets[0].data.length;
    }

    return tweets;
  }

  if (shouldUsePuppeteer) {
    const tweetIDs = await getTweetIDs(tweetId);
    tweets = await getTweetsFromArray(tweetIDs, includeReplies, process.env.TWITTER_AUTH_TOKEN);

    return tweets;
  }

  tweets = await getTweetsFromThreads(tweetId, includeReplies, process.env.TWITTER_AUTH_TOKEN);

  return tweets;
}

function verifyEnvironmentVariables(kindleEmail) {
  if (!process.env.TWITTER_AUTH_TOKEN)
    throw new UserError(
      "bearer-token-not-provided",
      "Please ensure that you have a .env file containing a value for TWITTER_AUTH_TOKEN"
    );

  if (process.argv.includes("-s")) {
    if (!process.env.HOST || !process.env.EMAIL || !process.env.PASS)
      throw new UserError(
        "mail-server-config-error",
        "Please setup the credentials for the mail server to send the email to Kindle"
      );
    if (!kindleEmail) {
      spinner.fail("UserError");
      throw new UserError(
        "empty-kindle-email",
        "Pass your kindle email address with -s or configure it in the .env file"
      );
    }

    if (!isValidEmail(kindleEmail)) {
      const errorMessage = !!process.argv[process.argv.indexOf("-s") + 1]
        ? "Enter a valid email address"
        : "Kindle Email configured in .env file is invalid";
      spinner.fail("UserError");
      throw new UserError("invalid-email", errorMessage);
    }
  }
}

// Execute it
main();
