const { writeFile } = require("fs").promises;
let tweets = { 
    common : {
      created_at: "",
      count: "",
      user: {
        id: "",
        username: "",
        name: "",
        profile_image_url: "",
        description: ""
      }
    }, 
    data : [] };

const addTweet = (tweet) => tweets.data.push(tweet);

const addCommon = (tweet, user) => {
  tweets.common.created_at = tweet.created_at;
  tweets.common.user = { ...user };
}

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
  tweets.common.count = tweets.data.length;
  return tweets;
}

module.exports = { addTweet,  addCommon, writeTweets, collectTweets };
