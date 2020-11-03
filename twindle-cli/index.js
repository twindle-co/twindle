// Entry program
const path = require("path");
const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const { generateEpub } = require("./epub/epub");
const { generatePDF } = require("./pdf");
const { getTweetsFromTweetId } = require("./twitter");

async function main() {
  const options = yargs(process.argv)
    .usage("Usage: -i <tweet id> -f <file format> -o <filename>")
    .option({
      i: {
        alias: "tweetId",
        demandOption: true,
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
        alias: "output",
        demandOption: true,
        describe: "Filename for the output file",
        type: "string",
      },
    }).argv;

  try {
    const tweets = await getTweetsFromTweetId(options.tweetId);
    /**
     * Execute certain function on different format
     */
    const mappings = {
      epub: async () => {},

      pdf: async () => {
        await generatePDF(tweets, `${process.cwd()}/${options.output}.pdf`);
      },

      mobi: async () => {},
    };

    const generatorFunc = mappings[options.format];

    generatorFunc && (await generatorFunc());
  } catch (e) {
    console.error(e);
  }

  // If not for this line, the script never finishes
  process.exit();
}

// Execute it
main();
