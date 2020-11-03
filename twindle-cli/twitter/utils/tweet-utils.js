const matchAll = require("string.prototype.matchall");

/**
 * Get tweet ID from URL `https://twitter.com/[USER]/status/[ID]` | Very flexible,
 * Will obtain IDs from `status/[ID]/photo/1` or `[ID]?s=20`
 * @param {string} tweet_url
 * @returns {string}
 */
const extractTweetId = (tweet_url) =>
  [
    ...matchAll(
      tweet_url,
      /https?:\/\/twitter.com\/[a-zA-Z_]{1,20}\/status\/([0-9]*)/g
    ),
  ][0][1];

const extractScreenName = (tweet_url) =>
  tweet_url
    .substring(0, tweet_url.lastIndexOf("/status"))
    .substring(tweet_url.lastIndexOf("/") + 1);

const getTweetObject = (responseJSON) => responseJSON.data[0];
const getTweetArray = (responseJSON) => responseJSON.data || [];
const getUserObject = (responseJSON) => responseJSON.includes.users[0];

const createCustomTweet = (tweet_object, user_object) => {
  return {
    id: tweet_object.id,
    name: user_object.name,
    twitterHandle: user_object.username,
    image: user_object.profile_image_url,
    createdAt: tweet_object.created_at,
    tweet: tweet_object.text,
  };
};

/**
 * @param {Response} response
 */
const checkIfRequestSuccessful = (response) => {
  // console.log(response.status);
  if (response.status === 200) return true;

  return false;
};

module.exports = {
  extractTweetId,
  extractScreenName,
  getTweetObject,
  getTweetArray,
  getUserObject,
  createCustomTweet,
  checkIfRequestSuccessful,
};
