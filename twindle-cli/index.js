require("./helpers/logger");
require("dotenv").config();
const { getCommandlineArgs, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsById, getTweetsFromArray } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");
const { getTweetIDs } = require("./twitter/scraping");
const { UserError } = require("./helpers/error");
const { red, cyan } = require("kleur");
const { formatLogColors } = require("./utils/helpers");
const { isValidEmail } = require("./utils/helpers");
const spinner = require("./spinner");

async function main() {
  prepareCli();
  spinner.start();
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
    let tweets = require("./twitter/mock/twitter-mock-responses/only-links.json");

    if (!mock) {
      if (shouldUsePuppeteer) {
        const tweetIDs = await getTweetIDs(tweetId);
        tweets = await getTweetsFromArray(tweetIDs, process.env.TWITTER_AUTH_TOKEN);
      } else tweets = await getTweetsById(tweetId, process.env.TWITTER_AUTH_TOKEN);
    }

    const intelligentOutputFileName = `${
      (tweets && tweets.common && tweets.common.user && tweets.common.user.username) || "twindle"
    }-${
      (tweets && tweets.common && tweets.common.created_at.replace(/,/g, "").replace(/ /g, "-")) ||
      "thread"
    }`;

    const outputFilePath = getOutputFilePath(outputFilename || intelligentOutputFileName, format);
    await Renderer.render(tweets, format, outputFilePath);

    if (process.argv.includes("-s")) {
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

// Execute it
main();
