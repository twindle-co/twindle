const { processMediaFromTweet } = require("./process-tweet-entities");
const { addTweet } = require("./tweet-info");
const { createCustomTweet, getUserObject, getTweetArray } = require("./tweet-utils");
async function processSearchResponse(responseJSON) {
  let directReplies = getTweetArray(responseJSON).filter(
    (tweet) =>
      tweet.referenced_tweets.filter(
        (ref) => ref.type == "replied_to" && ref.id == tweet.conversation_id
      ).length > 0
  );

  while (directReplies.length > 0) {
    let reply_id = directReplies[0].id;

    addTweet(createCustomTweet(processMediaFromTweet(directReplies[0])));
    directReplies = getTweetArray(responseJSON).filter(
      (tweet) =>
        tweet.referenced_tweets.filter((ref) => ref.type == "replied_to" && ref.id == reply_id)
          .length > 0
    );
  }
}
module.exports = { processSearchResponse };
