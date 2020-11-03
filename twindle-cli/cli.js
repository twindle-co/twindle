const yargs = require("yargs");

const getCommandlineArgs = (processArgv) =>
  yargs(processArgv)
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
        alias: "outputFilename",
        demandOption: true,
        describe: "Filename for the output file",
        type: "string",
      },
    }).argv;

module.exports = {
  getCommandlineArgs,
};
