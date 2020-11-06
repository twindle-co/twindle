const { writeFile } = require("fs").promises;
const { format } = require("date-fns");
const { fixUserDescription } = require("./process-tweet-entities");

let tweets = {
  common: {
    created_at: "",
    count: "",
    user: {
      id: "",
      username: "",
      name: "",
      profile_image_url: "",
      description: "",
    },
  },
  data: [],
};

const addTweet = (tweet) => tweets.data.push(tweet);

const addCommon = (tweet, user) => {
  tweets.common.created_at = format(new Date(tweet.created_at), "MMM d, yyyy  h:mm aaaa");
  tweets.common.user = { ...user };

  tweets = fixUserDescription(tweets);

  tweets.common.user.profile_image_url = tweets.common.user.profile_image_url.replace(
    "_normal.",
    "."
  );
};

async function writeTweets() {
  try {
    await writeFile("../output/twitter-api-response.json", JSON.stringify(tweets));
  } catch (err) {
    console.error(err);
  }
}

function collectTweets() {
  tweets.common.count = tweets.data.length;
  return tweets;
}

module.exports = { addTweet, addCommon, writeTweets, collectTweets };
