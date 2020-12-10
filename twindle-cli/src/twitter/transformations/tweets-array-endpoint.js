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
  const created_at = firstTweet.created_at;
  const userObject = responseJSON.includes.users.filter(
    (user) => user.id === firstTweet.author_id
  )[0];

  let tweet = await renderRichTweets(firstTweet, token, false);
  let user = userObject;

  /** @type {CustomTweetsObject} */
  let resp = {
    data: [],
    common: {},
  };

  resp.common.created_at = formatTimestamp(created_at);
  resp.common.user = { ...user };

  resp.common.user = fixUserDescription(resp.common.user);

  resp.common.user.profile_image_url = resp.common.user.profile_image_url.replace("_normal.", ".");

  resp.data.push(createCustomTweet(tweet, user));

  let directReplies = tweets
    .filter((tweet) => tweet.author_id === resp.common.user.id && tweet.referenced_tweets)
    .filter(
      (tweet) =>
        tweet.referenced_tweets.filter(
          (ref) => ref.type == "replied_to" && ref.id == tweet.conversation_id
        ).length > 0
    );

  while (directReplies.length > 0) {
    let reply_id = directReplies[directReplies.length - 1].id;

    resp.data.push(
      createCustomTweet(
        await renderRichTweets(directReplies[directReplies.length - 1], token, false)
      )
    );
    directReplies = tweets
      .filter((tweet) => tweet.author_id === resp.common.user.id && tweet.referenced_tweets)
      .filter(
        (tweet) =>
          tweet.referenced_tweets.filter((ref) => ref.type == "replied_to" && ref.id == reply_id)
            .length > 0
      );
  }

  resp.common.count = resp.data.length;
  return resp;
}

async function processReplies(responseJSON, token) {
  const firstTweet = responseJSON.data.filter((tweet) => tweet.id === tweet.conversation_id)[0];
  let indirectReplies = responseJSON.data.filter(
    (tweet) =>
      tweet.author_id === firstTweet.author_id &&
      tweet.in_reply_to_user_id &&
      tweet.in_reply_to_user_id != tweet.author_id
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

module.exports = {
  processTweetsArray,
  processReplies,
  updateReplies,
};
