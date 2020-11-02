// Entry program
const path = require("path");
const yargs = require("yargs");
const kleur = require("kleur");
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

	switch (options.format) {
		case "epub":
			generateEpub(`./${options.output}.epub`);
			break;
		case "pdf":
			const tweets = await getTweetsFromTweetId(options.tweetId);
			generatePDF(tweets, path.join(process.cwd(), options.output + ".pdf"));
			console.log("Your " + kleur.cyan("tweets") + " are saved into " + kleur.red(options.output + ".pdf"));
			break;
		case "mobi":
			console.log("Sorry this format is not supported yet");
			break;
		default:
			break;
	}
}
main();
