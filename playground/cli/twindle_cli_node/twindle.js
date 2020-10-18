//yargs is a npm module that makes passing command line arguments easy
//require the module in your package to use it
const yargs = require("yargs");


//create a variable that'll contain the yargs object and pass in its methods that you'll need
const args = yargs.options({
    "o": {
        alias: "option",
        describe: "twindle command line options,\n pdf for pdf, epub for epub, md for markdown, mobi for mobi",
        demandOption: true
    },
    "t": {
        alias: "thread-id",
        describe: "thread id of twitter thread that is to be converted",
        demandOption: true
    }
}).help().alias("help", "h")
.usage("node twindle --thread-id 100000 -o pdf - generates a pdf file from thread").argv;

/* 
--YARGS METHODS--
    -options() creates the command line options for the application
    -help() parameter logs a usage string and the options to console and exits the app,
        without parameters --help option will be used
    -alias() sets an alternate name for an option
    -usage() creates usage string that'll be logged when --help is called
*/


//if/elif block to check what options were passed and log a message
if (args.o === "pdf") {
    console.log("pdf generated from thread " + args["t-id"]);
} else if (args.o === "epub") {
    console.log("epub document generated from thread " + args["t-id"]);
} else if (args.o === "md") {
    console.log("markdown document generated from thread " + args["t-id"]);
} else if (args.o === "mobi") {
    console.log("mobi document generated from thread " + args["t-id"]);
} else{
    console.error("incorrect option")
}