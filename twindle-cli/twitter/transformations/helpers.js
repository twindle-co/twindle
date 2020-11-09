// @ts-check
// this file can be split into multiple files within a helpers folder

const twemoji = require("twemoji");
const { matchAll } = require("../utils/string");
const { formatTimestamp } = require("../utils/date");

/**
 * Get tweet ID from URL `https://twitter.com/[USER]/status/[ID]` | Very flexible,
 * Will obtain IDs from `status/[ID]/photo/1` or `[ID]?s=20`
 * @param {string} tweet_url
 * @returns {string}
 */
const extractTweetId = (tweet_url) =>
  [
    // @ts-ignore
    ...matchAll(tweet_url, /https?:\/\/twitter.com\/[a-zA-Z_]{1,20}\/status\/([0-9]*)/g),
  ][0][1];

const extractScreenName = (tweet_url) =>
  tweet_url
    .substring(0, tweet_url.lastIndexOf("/status"))
    .substring(tweet_url.lastIndexOf("/") + 1);

const getTweetArray = (responseJSON) => {
  return (responseJSON.data || []).map((data) => ({
    ...data,
    includes: responseJSON.includes,
  }));
};

const getUserObject = (responseJSON) => responseJSON.includes.users[0];

const getTweetObject = (responseJSON) => ({
  ...responseJSON.data[0],
  includes: responseJSON.includes,
});

const createCustomTweet = (tweet_object, user_object) => {
  // if (!tweet_object) return {};
  // console.log({ tweet_object });
  return {
    id: tweet_object.id,
    createdAt: formatTimestamp(tweet_object.created_at),
    tweet: twemoji.parse(fixLineBreaks(tweet_object.text), {
      folder: "svg",
      ext: ".svg",
    }),
    customMedia: tweet_object.customMedia,
    linkWithImage: tweet_object.linkWithImage,
  };
};

/**
 * Replaces `\n` with `<br />`
 * @param {string} tweet
 */
function fixLineBreaks(tweet) {
  return tweet.replace(/\n/g, "<br />");
}

module.exports = {
  extractTweetId,
  extractScreenName,
  getTweetArray,
  getUserObject,
  createCustomTweet,
  fixLineBreaks,
  getTweetObject,
};
