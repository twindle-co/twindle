const { getTweetObject, getUserObject, createCustomTweet } = require("./helpers");

const { renderRichTweets, fixUserDescription } = require("./rich-rendering");

// const { doTweetsSearch } = require("./tweets-search-request");
const { formatTimestamp } = require("../utils/date");

/**
 *
 * @param {any} responseJSON
 */
function processTweetLookup(responseJSON) {
  let tweet = renderRichTweets(getTweetObject(responseJSON));
  let user = getUserObject(responseJSON);

  let resp = {
    data: [],
    common: {},
  };

  resp.common.created_at = formatTimestamp(tweet.created_at);
  resp.common.user = { ...user };

  resp = fixUserDescription(resp);

  resp.common.user.profile_image_url = resp.common.user.profile_image_url.replace("_normal.", ".");

  resp.data.push(createCustomTweet(tweet, user));

  // await doTweetsSearch(tweet.conversation_id, user.username);

  resp.common.count = resp.data.length;
  return [resp, tweet, user];
}

module.exports = {
  processTweetLookup,
};
