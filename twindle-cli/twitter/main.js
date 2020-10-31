const { TWEET_LOOKUP , fetchUrl, computeUrl } = require("./utils/tweet-processing");
const { setTweetId, setScreenName } = require("./utils/tweet-info");
const fs = require('fs');

function getTweets(url) {
    setTweetId(url);
    setScreenName(url);
    fetchUrl(computeUrl(TWEET_LOOKUP), TWEET_LOOKUP);    
}
module.exports = { getTweets };