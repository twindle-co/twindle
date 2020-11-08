const {
  getTweetObject,
  getUserObject,
  createCustomTweet,
  renderRichTweets,
  fixUserDescription,
} = require("./helpers");
// const { doTweetsSearch } = require("./tweets-search-request");
const { format } = require("../utils/date");

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

  resp.common.created_at = format(new Date(tweet.created_at), "MMM d, yyyy");
  resp.common.user = { ...user };

  resp = fixUserDescription(resp);

  resp.common.user.profile_image_url = resp.common.user.profile_image_url.replace(
    "_normal.",
    "."
  );

  resp.data.push(createCustomTweet(tweet, user));

  // await doTweetsSearch(tweet.conversation_id, user.username);

  resp.common.count = resp.data.length;
  return [resp, tweet, user];
}

module.exports = {
  processTweetLookup,
};
