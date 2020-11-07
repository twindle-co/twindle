// Entry program
require("./helpers/logger");
require("dotenv").config();
const { getCommandlineArgs, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromTweetId } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");
const { getTweet } = require("./twitter-puppeteer");

async function main() {
  prepareCli();

  const {
    format,
    outputFilename,
    tweetId,
    _kindleEmail,
    mock,
    shouldUsePuppeteer,
  } = getCommandlineArgs(process.argv);

  try {
    // this next line is wrong
    let tweets = require("./twitter/twitter-mock-responses/only-links.json");

    if (!mock) {
      if (shouldUsePuppeteer) tweets = await getTweet(tweetId);
      else tweets = await getTweetsFromTweetId(tweetId);
    }

    const intelligentOutputFileName = `${
      (tweets && tweets.common && tweets.common.user && tweets.common.user.username) || "twindle"
    }-${
      (tweets && tweets.common && tweets.common.created_at.replace(/,/g, "").replace(/ /g, "-")) ||
      "thread"
    }`;

    const outputFilePath = getOutputFilePath(outputFilename || intelligentOutputFileName);
    await Renderer.render(tweets, format, outputFilePath);

    let kindleEmail = process.env.KINDLE_EMAIL || _kindleEmail;
    if (kindleEmail) {
      console.devLog("sending to kindle", kindleEmail);
      await sendToKindle(kindleEmail, outputFilePath);
    }
  } catch (e) {
    console.error(e);
  }

  // If not for this line, the script never finishes
  process.exit();
}

// Execute it
main();
