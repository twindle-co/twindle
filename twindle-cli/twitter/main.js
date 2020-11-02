const fs = require('fs');
const { doTweetLookup } = require("./utils/tweet-lookup-request");
const { extractTweetId } = require("./utils/tweet-utils");
const { writeTweets } = require("./utils/tweet-info");

async function getTweetsFromURL(url) {
    let response = await doTweetLookup(extractTweetId(url));
    writeTweets();
}
async function getTweetsFromTweetId(tweet_id) {
    await doTweetLookup(tweet_id);
    writeTweets();
}
module.exports = { getTweetsFromURL, getTweetsFromTweetId };