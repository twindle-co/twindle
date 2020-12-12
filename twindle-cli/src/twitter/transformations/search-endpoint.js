const { createCustomTweet, getTweetArray } = require("./helpers");

const { renderRichTweets, fixUserDescription } = require("./rich-rendering");

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
    let reply_id = directReplies[directReplies.length - 1].id;

    tweets.push(
      createCustomTweet(
        await renderRichTweets(directReplies[directReplies.length - 1], token, false)
      )
    );

    directReplies = getTweetArray(responseJSON).filter(
      (tweet) =>
        tweet.referenced_tweets.filter((ref) => ref.type == "replied_to" && ref.id == reply_id)
          .length > 0
    );
  }

  return tweets;
}

async function processReplies(responseJSON, token) {
  let indirectReplies = getTweetArray(responseJSON).filter(
    (tweet) => tweet.in_reply_to_user_id && tweet.in_reply_to_user_id != tweet.author_id
  );
  let replies = [];
  for (let indirectReply of indirectReplies) {
    let replyAnswer = createCustomTweet(await renderRichTweets(indirectReply, token, false));
    let reply = {
      id: indirectReply.referenced_tweets.filter((ref) => ref.type === "replied_to")[0].id,
      answer: replyAnswer,
    };
    replies.push(reply);
  }
  return replies;
}

async function updateReplies(responseJSON, replies, finalTweetsData, token) {
  for (let tweet of finalTweetsData.data) {
    tweet.replies = [];
  }
  for (let reply of replies) {
    let replyData = responseJSON.data.filter((tweet) => tweet.id === reply.id)[0];
    let tweetOnThreadId = replyData.referenced_tweets.filter((ref) => ref.type === "replied_to")[0]
      .id;

    let replyUser = responseJSON.includes.users.filter(
      (user) => replyData.author_id === user.id
    )[0];
    replyData.includes = responseJSON.includes;
    replyData = createCustomTweet(await renderRichTweets(replyData, token, false));
    replyUser.username = `@${replyUser.username}`;
    replyUser.profile_image_url = replyUser.profile_image_url.replace("_normal.", ".");
    replyUser = fixUserDescription(replyUser);
    replyData.user = replyUser;
    replyData.answer = reply.answer;
    let finalTweet = finalTweetsData.data.filter((tweet) => tweet.id === tweetOnThreadId)[0];
    if (finalTweet) {
      finalTweet.replies.push(replyData);
    }
  }
  return finalTweetsData;
}

module.exports = { processSearchResponse, processReplies, updateReplies };
