require("dotenv/config"); // ACCESSING THE .ENV file
const { doTweetLookup } = require("./utils/tweet-lookup-request");
const { extractTweetId } = require("./utils/tweet-utils");
const { writeTweets, collectTweets } = require("./utils/tweet-info");

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
  return collectTweets();
}

// getTweetsFromTweetId("1323819296267665409");

module.exports = { getTweetsFromURL, getTweetsFromTweetId };
