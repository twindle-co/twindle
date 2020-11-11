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

/** @param {string} tweet_url */
const extractScreenName = (tweet_url) =>
  tweet_url
    .substring(0, tweet_url.lastIndexOf("/status"))
    .substring(tweet_url.lastIndexOf("/") + 1);

/** @param {TwitterConversationResponse} responseJSON */
const getTweetArray = (responseJSON) => {
  return (responseJSON.data || []).map((data) => ({
    ...data,
    includes: responseJSON.includes,
  }));
};

/** @param {TwitterConversationResponse} responseJSON */
const getUserObject = (responseJSON) => responseJSON.includes.users[0];

/** @param {TwitterConversationResponse} responseJSON */
const getTweetObject = (responseJSON) => ({
  ...responseJSON.data[0],
  includes: responseJSON.includes,
});

/**
 * @param {TwitterConversationData} tweet_object
 * @returns {import("../types/types").CustomTweetData}
 */
const createCustomTweet = (tweet_object) => {
  /** @type {import("../types/types").CustomTweetData} */
  const tweet = {
    id: tweet_object.id,
    created_at: formatTimestamp(tweet_object.created_at),
    tweet: twemoji.parse(fixLineBreaks(tweet_object.text), {
      folder: "svg",
      ext: ".svg",
    }),
  };

  if (tweet_object.customMedia) {
    tweet.customMedia = tweet_object.customMedia;
  }

  if (tweet_object.linkWithImage) {
    tweet.linkWithImage = tweet_object.linkWithImage;
  }

  if (tweet_object.embeddedTweet) {
    tweet.embeddedTweet = tweet_object.embeddedTweet;
  }

  return tweet;
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
