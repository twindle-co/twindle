const yargs = require('yargs');
const { createLibraryIfNotExists } = require('./utils/library');

const getCommandlineArgs = (processArgv) =>
  yargs(processArgv)
    .usage(
      'Usage: -i <tweet id> -f <file format> -o <filename> -s <send to kindle email>'
    )
    .option({
      i: {
        alias: 'tweetId',
        demandOption: false,
        describe: "First tweet's tweet id in of the twitter thread",
        type: 'string',
      },
      f: {
        alias: 'format',
        demandOption: false,
        describe: 'Output file format',
        choices: ['mobi', 'epub', 'pdf'],
        type: 'string',
        default: 'pdf',
      },
      o: {
        alias: 'outputFilename',
        demandOption: false,
        describe: 'Filename for the output file',
        type: 'string',
        default: 'twindle-thread.pdf',
      },
      s: {
        alias: 'kindleEmail',
        demandOption: false,
        describe:
          'The email of the kindle device, you wish to send the created pdf',
        type: 'string',
      },
      m: {
        alias: 'mock',
        demandOption: false,
        describe: 'If set, will run in mock mode',
        type: 'boolean',
      },
      p: {
        alias: 'shouldUsePuppeteer',
        demandOption: false,
        describe: 'Should use Puppeteer or not',
        type: 'boolean',
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
