// Entry program
const { getCommandlineArgs } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromTweetId } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");

async function main() {
  const { format, outputFilename, tweetId } = getCommandlineArgs(process.argv);

  try {
    const tweets = await getTweetsFromTweetId(tweetId);
    const outputFilePath = getOutputFilePath(outputFilename);
    await Renderer.render(tweets, format, outputFilePath);
  } catch (e) {
    console.error(e);
  }

  // If not for this line, the script never finishes
  process.exit();
}

// Execute it
main();
