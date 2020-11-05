// Entry program
require("./helpers/logger");
const { getCommandlineArgs, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromTweetId } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");

async function main() {
  prepareCli();

  const {
    format,
    outputFilename,
    tweetId,
    kindleEmail,
    mock,
  } = getCommandlineArgs(process.argv);

  try {
    // this next line is wrong
    let tweets = require("../twindle-core/twitter_responses/response-version2-tweetthread.json");
    if (!mock) tweets = await getTweetsFromTweetId(tweetId);

    const outputFilePath = getOutputFilePath(outputFilename);
    await Renderer.render(tweets, format, outputFilePath);

    if (kindleEmail) {
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
