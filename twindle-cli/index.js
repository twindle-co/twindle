// Entry program
require("./helpers/logger");
require("dotenv").config();
const { getCommandlineArgs, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromTweetId } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");
const { getTweet } = require("./twitter-puppeteer");
const { UserError } = require("./helpers/error");
const { red } = require("kleur");

async function main() {
  prepareCli();

  const {
    format,
    outputFilename,
    tweetId,
    sendKindleEmail: kindleEmail,
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

    if (process.argv.includes("-s")) {
      if (!kindleEmail)
        throw new UserError(
          "empty-kindle-email",
          "Pass your kindle email address with -s or configure it in the .env file"
        );

      console.devLog("sending to kindle", kindleEmail);
      await sendToKindle(kindleEmail, outputFilePath);
    }
  } catch (e) {

    // Show stack errors if Dev logs are enabled in `.env` file
    if (process.env.DEV) {
      console.log(e);
    } else {
      console.error(`${red(e.name)}: ${e.message}`);
    }
  }

  // If not for this line, the script never finishes
  process.exit();
}

// Execute it
main();
