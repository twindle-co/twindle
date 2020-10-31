import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generateEpub } from "./epub.js";

const options = yargs(hideBin(process.argv))
   .usage("Usage: -o <file format> -n <filename>")
   .option({
	o: {
		alias: "output",
		demandOption: false,
      describe: "Output file format",
		choices: ["mobi", "epub", "pdf"],
      type: "string",
      default: "epub",
	},
	n: {
		alias: "filename",
		demandOption: true,
		describe: "Filename for the output file",
		type: "string",
	},
}).argv;

switch (options.output) {
	case 'epub':
		generateEpub(`./${options.filename}.epub`);
		break;
	case 'pdf':
		console.log('Sorry this format is not supported yet')
		break;
	case 'mobi':
		console.log('Sorry this format is not supported yet')
		break;
	default:
		break;
}
