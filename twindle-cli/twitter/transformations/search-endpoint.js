const { createCustomTweet, getTweetArray } = require("./helpers");

const { renderRichTweets } = require("./rich-rendering");

function processSearchResponse(responseJSON) {
  const tweets = [];
  let directReplies = getTweetArray(responseJSON).filter(
    (tweet) =>
      tweet.referenced_tweets.filter(
        (ref) => ref.type == "replied_to" && ref.id == tweet.conversation_id
      ).length > 0
  );

  while (directReplies.length > 0) {
    let reply_id = directReplies[0].id;

    tweets.push(createCustomTweet(renderRichTweets(directReplies[0])));
    directReplies = getTweetArray(responseJSON).filter(
      (tweet) =>
        tweet.referenced_tweets.filter(
          (ref) => ref.type == "replied_to" && ref.id == reply_id
        ).length > 0
    );
  }

  return tweets;
}

module.exports = { processSearchResponse };
