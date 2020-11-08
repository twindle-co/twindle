require("dotenv/config"); // ACCESSING THE .ENV file
const { doTweetLookup } = require("./utils/tweet-lookup-request");
const { doTweetsLookup } = require("./utils/tweets-array-lookup-request")
const { extractTweetId } = require("./utils/tweet-utils");
const { writeTweets, collectTweets } = require("./utils/tweet-info");
const { writeFile } = require("fs").promises;
const { resolve } = require("path");

async function getTweetsFromURL(url) {
  let response = await doTweetLookup(extractTweetId(url));
  await writeTweets();

  return response;
}

/**
 *
 * @param {string} tweet_id
 */
async function getTweetsFromTweetId(tweet_id) {
  await doTweetLookup(tweet_id);

  // await writeFile(
  //   resolve("../twindle-cli/twitter/twitter-mock-responses/images-text.json"),
  //   JSON.stringify(collectTweets(), null, 2),
  //   "utf-8"
  // );
  return collectTweets();
}

async function getTweetsFromTweetArray(tweet_ids) {
  await doTweetsLookup(tweet_ids);
  return collectTweets();
}

// getTweetsFromTweetId("1323819296267665409");

module.exports = { getTweetsFromURL, getTweetsFromTweetId, getTweetsFromTweetArray };
