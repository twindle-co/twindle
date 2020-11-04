require("dotenv/config"); // ACCESSING THE .ENV file
const fs = require("fs");
const { doTweetLookup } = require("./utils/tweet-lookup-request");
const { extractTweetId } = require("./utils/tweet-utils");
const { writeTweets, collectTweets } = require("./utils/tweet-info");

async function getTweetsFromURL(url) {
  let response = await doTweetLookup(extractTweetId(url));
  await writeTweets();

  return response;
}

async function getTweetsFromTweetId(tweet_id) {
  await doTweetLookup(tweet_id);
  return collectTweets();
}

module.exports = { getTweetsFromURL, getTweetsFromTweetId };
