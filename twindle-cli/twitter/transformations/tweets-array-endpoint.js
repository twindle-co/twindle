const { createCustomTweet } = require("./helpers");

const { renderRichTweets, fixUserDescription } = require("./rich-rendering");

const { formatTimestamp } = require("../utils/date");

/**
 * @param {TwitterConversationResponse} responseJSON
 */
async function processTweetsArray(responseJSON, token) {
  const tweets = (responseJSON.data || []).map((resData) => ({
    ...resData,
    includes: responseJSON.includes,
  }));

  const firstTweet = tweets.filter((tweet) => tweet.id === tweet.conversation_id)[0];
  const userObject = responseJSON.includes.users.filter(
    (user) => user.id === firstTweet.author_id
  )[0];

  let tweet = await renderRichTweets(firstTweet, token);
  let user = userObject;

  /** @type {CustomTweetsObject} */
  let resp = {
    data: [],
    common: {},
  };

  resp.common.created_at = formatTimestamp(tweet.created_at);
  resp.common.user = { ...user };

  resp = fixUserDescription(resp);

  resp.common.user.profile_image_url = resp.common.user.profile_image_url.replace("_normal.", ".");

  resp.data.push(createCustomTweet(tweet, user));

  let directReplies = tweets
    .filter((tweet) => tweet.referenced_tweets)
    .filter(
      (tweet) =>
        tweet.referenced_tweets.filter(
          (ref) => ref.type == "replied_to" && ref.id == tweet.conversation_id
        ).length > 0
    );

  while (directReplies.length > 0) {
    let reply_id = directReplies[0].id;

    resp.data.push(createCustomTweet(await renderRichTweets(directReplies[0], token)));
    directReplies = tweets
      .filter((tweet) => tweet.referenced_tweets)
      .filter(
        (tweet) =>
          tweet.referenced_tweets.filter((ref) => ref.type == "replied_to" && ref.id == reply_id)
            .length > 0
      );
  }

  resp.common.count = resp.data.length;
  return resp;
}

module.exports = {
  processTweetsArray,
};
