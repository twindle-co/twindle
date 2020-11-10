const { createCustomTweet, getTweetArray } = require("./helpers");

const { renderRichTweets } = require("./rich-rendering");

/**
 * @param {TwitterConversationResponse} responseJSON
 * @param {string} token
 */
async function processSearchResponse(responseJSON, token) {
  /** @type {import("../types/types").CustomTweetData[]} */
  const tweets = [];

  let directReplies = getTweetArray(responseJSON).filter(
    (tweet) =>
      tweet.referenced_tweets.filter(
        (ref) => ref.type == "replied_to" && ref.id == tweet.conversation_id
      ).length > 0
  );

  while (directReplies.length > 0) {
    let reply_id = directReplies[0].id;

    tweets.push(createCustomTweet(await renderRichTweets(directReplies[0], token)));

    directReplies = getTweetArray(responseJSON).filter(
      (tweet) =>
        tweet.referenced_tweets.filter((ref) => ref.type == "replied_to" && ref.id == reply_id)
          .length > 0
    );
  }

  return tweets;
}

module.exports = { processSearchResponse };
