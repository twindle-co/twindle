const { writeFile } = require("fs").promises;
let tweets = [];

const addTweet = (tweet) => tweets.push(tweet);

async function writeTweets() {
  try {
    await writeFile(
      "../output/twitter-api-response.json",
      JSON.stringify(tweets)
    );
  } catch (err) {
    console.error(err);
  }
}

function collectTweets() {
  return tweets;
}

module.exports = { addTweet, writeTweets, collectTweets };
