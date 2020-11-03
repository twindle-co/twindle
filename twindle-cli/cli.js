const yargs = require("yargs");
const { createLibraryIfNotExists } = require("./utils/library");

const getCommandlineArgs = processArgv =>
	yargs(processArgv)
		.usage("Usage: -i <tweet id> -f <file format> -o <filename> -s <send to kindle email>")
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
			s: {
				alias: "kindleEmail",
				demandOption: false,
				describe: "The email of the kindle device, you wish to send the created pdf",
				type: "string",
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
