const fs = require("fs");
let tweets = [];

const addTweet = (tweet) => tweets.push(tweet);

function writeTweets() {
    try {
        fs.writeFileSync('./twitter/output/twitter-api-response.json', JSON.stringify(tweets));
      } catch (err) {
        console.error(err);
      }
}

module.exports = {  addTweet, writeTweets };