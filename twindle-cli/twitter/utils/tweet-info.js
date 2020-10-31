const { extractScreenName, extractTweetId } = require("./tweet-utils");
const fs = require("fs");

let tweet_id = '';
let screen_name = '';
let conversation_id = '';
let tweets = [];


function addTweets(tweets_from_api) {
    tweets_from_api.forEach(tweet=>tweets.push(tweet));
}

function addTweet(tweet) {
    tweets.push(tweet);
}

function writeTweets() {
    try {
        fs.writeFileSync('./output/twitter-api-response.json', JSON.stringify(tweets));
      } catch (err) {
        console.error(err);
      }
}

function setTweetId(url) {
    tweet_id = extractTweetId(url);
}

function setScreenName(url) {
    screen_name = extractScreenName(url);
}

function getTweetId() {
    return tweet_id;
}
    

function getScreenName() {
    return screen_name;
}

function setConversationId(convId) {
    conversation_id = convId;
}

function getConversationId() {
    return conversation_id;
}

module.exports = { setTweetId,
                    setConversationId,
                    setScreenName,
                    addTweet,
                    writeTweets,
                    setConversationId,
                    getTweetId,
                    getScreenName,
                    getConversationId };