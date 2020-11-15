const yargs = require("yargs");
const { createLibraryIfNotExists } = require("./utils/library");

const getCommandlineArgs = (processArgv) =>
  yargs(processArgv)
    .usage(
      "Usage: -i <tweet id> -u <user_id> -n <default_num_tweets> -f <file format> -o <filename> -s <send to kindle email| Optionally pass kindle email here>"
    )
    .option({
      i: {
        alias: "tweetId",
        demandOption: false,
        describe: "First tweet's tweet id in of the twitter thread",
        type: "string",
      },
      f: {
        alias: "format",
        demandOption: false,
        describe: "Output file format",
        choices: ["mobi", "epub", "pdf"],
        type: "string",
        default: "pdf",
      },
      o: {
        alias: "outputFilename",
        demandOption: false,
        describe: "Filename for the output file",
        type: "string",
      },
      s: {
        alias: "kindleEmail",
        demandOption: false,
        describe:
          "Send document to your kindle email. Optionally pass kindle email here if not configured in .env file",
        type: "string",
        default: process.env.KINDLE_EMAIL,
      },
      m: {
        alias: "mock",
        demandOption: false,
        describe: "If set, will run in mock mode",
        type: "boolean",
      },
      "generate-mock": {
        alias: "generateMock",
        demandOption: false,
        describe: "generates a mock json file of the current data",
        type: "boolean",
        default: false,
      },
      p: {
        alias: "shouldUsePuppeteer",
        demandOption: false,
        describe: "Should use Puppeteer or not",
        type: "boolean",
      },
      a: {
        alias: "appendToFilename",
        demandOption: false,
        describe: "Append string to the filename",
        type: "string",
      },
      u: {
        alias: "userId",
        demandOption: false,
        describe:
          "The Twitter ID of the user whose timeline of recent tweets you are trying to read",
        type: "string",
      },
      n: {
        alias: "numTweets",
        demandOption: false,
        describe: "Used together with u option to specify the number of tweets to be read",
        type: "integer",
        default: 10,
      },
    }).argv;

// Intends to do such things for one time for the user, like config creating, main outputdir creation
function prepareCli() {
  // creating the TwindleLibrary if not exists
  createLibraryIfNotExists();
}

module.exports = {
  getCommandlineArgs,
  prepareCli,
};
