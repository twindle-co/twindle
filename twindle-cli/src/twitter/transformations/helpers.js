// @ts-check
// this file can be split into multiple files within a helpers folder

const twemoji = require("twemoji");
const { formatTimestamp } = require("../utils/date");

/** @param {string} tweet_url */
const extractScreenName = (tweet_url) => tweet_url.replace(/^https?:\/\//, "").split("/")[1];

/** @param {TwitterConversationResponse} responseJSON */
const getTweetArray = (responseJSON) => {
  return (responseJSON.data || []).map((data) => ({
    ...data,
    includes: responseJSON.includes,
  }));
};

/** @param {TwitterConversationResponse} responseJSON */
const getUserObject = (responseJSON) =>
  responseJSON.includes.users.filter((user) => user.id === responseJSON.data[0].author_id)[0];

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
    tweet: twemoji.parse(fixLineBreaks(tweet_object.text), {
      folder: "svg",
      ext: ".svg",
    }),
  };

  if (tweet_object.created_at) tweet.created_at = formatTimestamp(tweet_object.created_at);

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
  extractScreenName,
  getTweetArray,
  getUserObject,
  createCustomTweet,
  fixLineBreaks,
  getTweetObject,
};
