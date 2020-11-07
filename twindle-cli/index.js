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
    let tweets = require("./twitter/twitter_responses/response-version2-tweetthread.json");

    if (!mock) {
      if (shouldUsePuppeteer) tweets = await getTweet(tweetId);
      else tweets = await getTweetsFromTweetId(tweetId);
    }

    const intelligentOutputFileName = `${
      tweets.common.user.username
    }-${tweets.common.created_at.replace(/,/g, "").replace(/ /g, "-")}`;

    await Renderer.render(
      tweets,
      format,
      getOutputFilePath(outputFilename || intelligentOutputFileName)
    );

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
