const { format } = require("date-fns");
const matchAll = require("string.prototype.matchall");
const twemoji = require("twemoji");

const {
  ENDPOINT_TO_FETCH_CONVERSATION_ID,
  TWEET_FIELDS,
  USER_FIELDS,
  MEDIA_FIELDS,
  POLL_FIELDS,
  PLACE_FIELDS,
  EXPANSIONS,
} = require("./twitter-endpoints");

/**
 * Get tweet ID from URL `https://twitter.com/[USER]/status/[ID]` | Very flexible,
 * Will obtain IDs from `status/[ID]/photo/1` or `[ID]?s=20`
 * @param {string} tweet_url
 * @returns {string}
 */
const extractTweetId = (tweet_url) =>
  [...matchAll(tweet_url, /https?:\/\/twitter.com\/[a-zA-Z_]{1,20}\/status\/([0-9]*)/g)][0][1];

const extractScreenName = (tweet_url) =>
  tweet_url
    .substring(0, tweet_url.lastIndexOf("/status"))
    .substring(tweet_url.lastIndexOf("/") + 1);

const getTweetObject = (responseJSON) => ({
  ...responseJSON.data[0],
  includes: responseJSON.includes,
});
const getTweetArray = (responseJSON) => {
  return responseJSON.data.map((data) => ({ ...data, includes: responseJSON.includes })) || [];
};
const getUserObject = (responseJSON) => responseJSON.includes.users[0];

const createCustomTweet = (tweet_object, user_object) => {
  // if (!tweet_object) return {};
  // console.log({ tweet_object });
  return {
    id: tweet_object.id,
    createdAt: format(new Date(tweet_object.created_at), "MMM d, yyyy  h:mm aaaa"),
    tweet: twemoji.parse(fixLineBreaks(tweet_object.text), {
      folder: "svg",
      ext: ".svg",
    }),
    customMedia: tweet_object.customMedia,
  };
};

/**
 * @param {Response} response
 */
const checkIfRequestSuccessful = (response) => {
  if (response.status === 200) return true;

  return false;
};

/**
 * Replaces `\n` with `<br />`
 * @param {string} tweet
 */
function fixLineBreaks(tweet) {
  return tweet.replace(/\n/g, "<br />");
}

/**
 * Returns the API endpoint URL from `tweet_id`
 * @param {string} tweet_id
 */
const getUrl = (tweet_id) =>
  `${ENDPOINT_TO_FETCH_CONVERSATION_ID}${tweet_id}${TWEET_FIELDS}${EXPANSIONS}${USER_FIELDS}${MEDIA_FIELDS}${PLACE_FIELDS}${POLL_FIELDS}`;

module.exports = {
  extractTweetId,
  extractScreenName,
  getTweetObject,
  getTweetArray,
  getUserObject,
  createCustomTweet,
  checkIfRequestSuccessful,
  fixLineBreaks,
  getUrl,
};
