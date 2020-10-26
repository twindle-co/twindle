const Mustache = require("mustache");
const fs = require("fs");
const createHTML = require("create-html");
const htmlToPdf = require("html-to-pdf");
const yargs = require("yargs");
const { resolve } = require("path");

const args = yargs
  .options({
    o: {
      alias: "option",
      describe:
        "twindle command line options\n choices 'pdf', 'epub', 'mobi', 'md'",
      demandOption: true,
    },
    f: {
      alias: "file path",
      describe: "file path of json to be converted to pdf",
      demandOption: true,
    },
  })
  .help()
  .alias("help", "h")
  .usage("node script -f <file name> -o <file type>").argv;

if (args["o"] === "pdf" && fs.existsSync(resolve(args["f"]))) {
  console.log("JSON file is available in the path " + resolve(args["f"]));
  main();
} else {
  console.log("PDF only supported " + args["o"]);
}

function main() {
  data = require("./twit_thread.json");
  //console.log(data);
  let tweetData = {
    tweets: data,
  };
  getHtml(tweetData);
}

function getHtml(tweetData) {
  //console.log("TweetData", tweetData);
  //get external mustache template
  fs.readFile("tweet_template.mustache", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    //render the View data in the Mustache template
    let info = Mustache.render(data, tweetData);
    //create an HTMLContent
    let htmlContent = createHTML({
      title: "Twindle",
      body: info,
      css: "output.css", //external css
    });
    getPdf(htmlContent);
  });
}

function getPdf(htmlContent) {
  //console.log("HTML ",htmlContent);
  //create html file and write the htmlcontent which we are getting from Mustache template
  fs.writeFile("output.html", htmlContent, function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });
  //convert the HTML Content/HTML Page to PDF
  htmlToPdf.convertHTMLFile("output.html", "output.pdf", function (error) {
    if (error) {
      console.log("Error Occured ", error);
      return;
    }
    console.log("PDF Succesfully saved in " + process.cwd() + "\\output.pdf");
  });
}
