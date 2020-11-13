const { createCustomTweet } = require("./helpers");

const { renderRichTweets, fixUserDescription } = require("./rich-rendering");

const { formatTimestamp } = require("../utils/date");

/**
 * @param {TwitterConversationResponse} responseJSON
 */
async function processUserTweets(screenName, responseJSON, token) {
  const tweets = (responseJSON.data || []).map((resData) => ({
    ...resData,
    includes: responseJSON.includes,
  }));

  const userObject = responseJSON.includes.users.filter((user) => user.username === screenName)[0];

  let user = userObject;

  /** @type {CustomTweetsObject} */
  let resp = {
    data: [],
    common: {},
  };

  resp.common.created_at = formatTimestamp(new Date() + "");
  resp.common.user = { ...user };

  resp = fixUserDescription(resp);

  resp.common.user.profile_image_url = resp.common.user.profile_image_url.replace("_normal.", ".");

  let conversations = [];
  for (let tweet of tweets) {
    if (!conversations.includes(tweet.conversation_id)) {
      conversations.push(tweet.conversation_id);
      let threadTweets = tweets.filter((t) => tweet.conversation_id === t.conversation_id);
      for (i = threadTweets.length - 1; i >= 0; i--) {
        resp.data.push(createCustomTweet(await renderRichTweets(threadTweets[i], token)));
      }
    }
  }
  resp.common.count = resp.data.length;
  return resp;
}

module.exports = {
  processUserTweets,
};
