const { format } = require("date-fns");
const yargs = require("yargs");
const { UserError } = require("./helpers/error");
const { createLibraryIfNotExists } = require("./utils/library");
const sendEmail = require("./utils/send-email");
const { isValidEmail } = require("./utils/helpers");
const { readFile } = require("fs").promises;

const getCommandlineArgs = (processArgv) =>
  yargs(processArgv)
    .usage(
      "Usage: -i <tweet id or a comma separated list of tweet ids> -r <include replies by author of thread to other users>" +
        " -u <user_id> -n <default_num_tweets>" +
        " -f <file format - pdf | epub>" +
        " -o <filename> -a<if o is not present a file name is calculated and this a text can be appended to it" +
        " -s <send to kindle email| Optionally pass kindle email here>"
    )
    .option({
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
      a: {
        alias: "appendToFilename",
        demandOption: false,
        describe: "Append string to the filename",
        type: "string",
      },
      i: {
        alias: "tweetId",
        demandOption: false,
        describe: "First tweet's tweet id in of the twitter thread",
        type: "string",
      },
      r: {
        alias: "includeReplies",
        demandOption: false,
        describe: "include replies by thread author",
        type: "boolean",
        default: false,
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
      ms: {
        alias: "mockSource",
        demandOption: false,
        describe: "To be used with mock flag",
        type: "string",
        default: "twitter",
      },
      "generate-mock": {
        alias: "generateMock",
        demandOption: false,
        describe: "generates a mock json file of the current data",
        type: "boolean",
        default: true,
      },
      p: {
        alias: "shouldUsePuppeteer",
        demandOption: false,
        describe: "Should use Puppeteer or not",
        type: "boolean",
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
      g: {
        alias: "gitHubURL",
        demandOption: false,
        describe: "The README.md file of git Repo",
        type: "string",
      },
      h: {
        alias: "storyId",
        demandOption: false,
        describe: "Hackernews story ids",
        type: "string",
      },
      t: {
        alias: "numTopComments",
        demandOption: false,
        describe:
          "Used together with h option to specify the number of levels of comments to be picked up",
        type: "integer",
        default: 5,
      },
      d: {
        alias: "numCommentLevels",
        demandOption: false,
        describe:
          "Used together with h option to specify the number of levels of comments to be picked up",
        type: "integer",
        default: 3,
      },
      e: {
        alias: "articleUrl",
        demandOption: false,
        describe: "URL to read from",
        type: "string",
      },
    }).argv;

// Intends to do such things for one time for the user, like config creating, main outputdir creation
function prepareCli() {
  // creating the TwindleLibrary if not exists
  createLibraryIfNotExists();
}

async function getCommandLineObject() {
  const {
    format,
    outputFilename,
    tweetId,
    includeReplies,
    kindleEmail,
    mock,
    mockSource,
    shouldUsePuppeteer,
    appendToFilename,
    userId,
    numTweets,
    generateMock,
    gitHubURL,
    storyId,
    numTopComments,
    numCommentLevels,
    articleUrl,
  } = getCommandlineArgs(process.argv);
  const cliObject = {};
  appendFileFormat(cliObject, format);
  appendOutputFileName(cliObject, outputFilename, appendToFilename);
  appendKindleEmail(cliObject, kindleEmail);
  appendTwitterSource(cliObject, tweetId, includeReplies, userId, numTweets);
  await appendGithubSource(cliObject, gitHubURL);
  appendHackernewsSource(cliObject, storyId, numTopComments, numCommentLevels);
  appendArticleSource(cliObject, articleUrl);
  appendMock(cliObject, mock, mockSource);
  validateCliObject(cliObject);
  cliObject.generateMock = process.argv.includes("-generate-mock") && generateMock;
  return cliObject;
}

const appendFileFormat = (cliObject, format) => {
  if (format != "pdf" && format != "epub")
    throw new UserError(
      "file-format-not-supported",
      "Currently only pdf and epub formats are supported. Please choose one of the two"
    );
  cliObject.format = format;
  return cliObject;
};

const appendOutputFileName = (cliObject, outputFilename, appendToFilename) => {
  if (outputFilename || appendToFilename) {
    cliObject.fileName = {};
    if (outputFilename) cliObject.fileName.outputFilename = outputFilename;
    else cliObject.fileName.appendToFilename = appendToFilename;
  }
  return cliObject;
};

const appendKindleEmail = (cliObject, kindleEmail) => {
  if (process.argv.includes("-s")) {
    if (!process.env.HOST || !process.env.EMAIL || !process.env.PASS)
      throw new UserError(
        "mail-server-config-error",
        "Please setup the credentials for the mail server to send the email to Kindle"
      );
    if (!kindleEmail) {
      throw new UserError(
        "empty-kindle-email",
        "Pass your kindle email address with -s or configure it in the .env file"
      );
    }

    if (!isValidEmail(kindleEmail)) {
      const errorMessage = !!process.argv[process.argv.indexOf("-s") + 1]
        ? "Enter a valid email address"
        : "Kindle Email configured in .env file is invalid";
      throw new UserError("invalid-email", errorMessage);
    }
    cliObject.kindleEmail = kindleEmail;
  }
  return cliObject;
};

const appendTwitterSource = (cliObject, tweetId, includeReplies, userId, numTweets) => {
  if (process.argv.includes("-i") && process.argv.includes("-u"))
    throw new UserError(
      "invalid-combination-of-twitter-params",
      "Please choose either tweet ids or user ids"
    );
  if (process.argv.includes("-i") || process.argv.includes("-u")) {
    if (!process.env.TWITTER_AUTH_TOKEN)
      throw new UserError(
        "bearer-token-not-provided",
        "Please ensure that you have a .env file containing a value for TWITTER_AUTH_TOKEN"
      );

    cliObject.dataSource = "twitter";
    cliObject.twitter = {};
    if (tweetId) {
      if (process.argv.includes("-n"))
        throw new UserError(
          "invalid-combination-of-twitter-params",
          "Cannot include -n for the tweet id option"
        );
      cliObject.twitter.tweetId = tweetId;
      cliObject.twitter.includeReplies = process.argv.includes("-r") && includeReplies;
    } else {
      if (process.argv.includes("-r"))
        throw new UserError(
          "invalid-combination-of-twitter-params",
          "Cannot include -r for the user id option"
        );
      cliObject.twitter.userId = userId;
      cliObject.twitter.numTweets = numTweets;
    }
  }
  return cliObject;
};

const appendGithubSource = async (cliObject, gitHubURL) => {
  if (cliObject.dataSource && process.argv.includes("-g")) {
    throw new UserError(
      "invalid-combination-of-input-arguments",
      "Cannot include -g together with twitter related params"
    );
  }
  if (process.argv.includes("-g")) {
    cliObject.dataSource = "github";
    cliObject.github = {};
    cliObject.github.githubURL = await validateGithubURL(gitHubURL);
  }
  return cliObject;
};

async function validateGithubURL(gitHubURL) {
  if (!(gitHubURL.toLowerCase().endsWith(".md") || gitHubURL.toLowerCase().endsWith(".txt")))
    throw new UserError(
      "invalid-value-for-input-argument",
      "Can only include an MD file or a txt file for -g parameter"
    );
  if (gitHubURL.toLowerCase().endsWith(".md")) return gitHubURL;
  else {
    const reposText = await readFile(`${__dirname}/github/input/${gitHubURL}`, "utf-8");
    return reposText.split(/\r?\n/).join(",");
  }
}

const appendHackernewsSource = (cliObject, storyId, numTopComments, numCommentLevels) => {
  if (cliObject.dataSource && process.argv.includes("-h")) {
    throw new UserError(
      "invalid-combination-of-input-arguments",
      "Cannot include -h together with twitter or github related params"
    );
  }
  if (process.argv.includes("-h")) {
    cliObject.dataSource = "hackernews";
    cliObject.hackernews = {};
    cliObject.hackernews.storyId = storyId;
    cliObject.hackernews.numTopComments = numTopComments;
    cliObject.hackernews.numCommentLevels = numCommentLevels;
  }
  return cliObject;
};

const appendArticleSource = (cliObject, articleUrl) => {
  if (cliObject.dataSource && process.argv.includes("-read")) {
    throw new UserError(
      "invalid-combination-of-input-arguments",
      "Cannot include -read together with twitter or github or hackernews related params"
    );
  }
  if (process.argv.includes("-e")) {
    cliObject.dataSource = "article";
    cliObject.article = {};
    cliObject.article.articleUrl = articleUrl;
  }
  return cliObject;
};

const appendMock = (cliObject, mock, mockSource) => {
  if (cliObject.dataSource && process.argv.includes("-m")) {
    throw new UserError(
      "invalid-combination-of-input-arguments",
      "Cannot include -m together with twitter or github or hackernews related params"
    );
  }
  if (cliObject.mock && !process.argv.includes("-ms")) {
    throw new UserError(
      "invalid-combination-of-input-arguments",
      "Cannot use -m option without -ms which is the source for the mock option"
    );
  }
  if (process.argv.includes("-m")) {
    cliObject.mockSource = mockSource;
  }
};

const validateCliObject = (cliObject) => {
  if (!cliObject.dataSource && !cliObject.mock)
    throw new UserError(
      "invalid-combination-of-input-arguments",
      "Either one of the sources information must be specified or the mock flag must be set, otherwise the application will not run"
    );
};

module.exports = {
  getCommandlineArgs,
  prepareCli,
  getCommandLineObject,
  validateGithubURL,
};
