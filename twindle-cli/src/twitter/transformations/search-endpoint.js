// @ts-check

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

/**
 *
 * @param {TwitterConversationResponse} responseJSON
 * @param {string} token
 */
async function processReplies(responseJSON, token) {
  let indirectReplies = getTweetArray(responseJSON).filter(
    (tweet) => tweet.in_reply_to_user_id && tweet.in_reply_to_user_id != tweet.author_id
  );

  /** @type {Reply[]} */
  let replies = [];

  for (let indirectReply of indirectReplies) {
    /** @type {import("../types/types").Answer} */
    let replyAnswer = createCustomTweet(await renderRichTweets(indirectReply, token, false));

    /** @type {Reply} */
    // @ts-ignore
    let reply = {
      id: indirectReply.referenced_tweets.filter((ref) => ref.type === "replied_to")[0].id,
      answer: replyAnswer,
    };
    replies.push(reply);
  }
  return replies;
}

/**
 *
 * @param {TwitterConversationResponse} responseJSON
 * @param {Reply[]} replies
 * @param {import("../types/types").CustomTweets} finalTweetsData
 * @param {string} token
 */
async function updateReplies(responseJSON, replies, finalTweetsData, token) {
  for (let tweet of finalTweetsData.data) {
    tweet.replies = [];
  }

  for (let reply of replies) {
    let replyResponseData = responseJSON.data.filter((tweet) => tweet.id === reply.id)[0];

    let tweetOnThreadId = replyResponseData.referenced_tweets.filter(
      (ref) => ref.type === "replied_to"
    )[0].id;

    let replyUser = responseJSON.includes.users.filter(
      (user) => replyResponseData.author_id === user.id
    )[0];

    /** @type {Reply} */
    let replyData;

    // @ts-ignore
    replyData = createCustomTweet(await renderRichTweets(replyResponseData, token, false));

    replyData.includes = responseJSON.includes;

    replyUser.username = `@${replyUser.username}`;
    replyUser.profile_image_url = replyUser.profile_image_url.replace("_normal.", ".");

    replyData.user = replyUser;
    replyData.answer = reply.answer;

    replyData.tweet = replyData.tweet
      .split(" ")
      .filter(
        (text, i, arr) =>
          !(
            (text.startsWith("<a") &&
              arr[i + 1] &&
              arr[i + 1].includes("@") &&
              arr[i + 1].includes("href")) ||
            (text.includes("@") && text.includes("href="))
          )
      )
      .join(" ");

    replyData.answer.tweet = replyData.answer.tweet
      .split(" ")
      .filter(
        (text, i, arr) =>
          !(
            (text.startsWith("<a") &&
              arr[i + 1] &&
              arr[i + 1].includes("@") &&
              arr[i + 1].includes("href")) ||
            (text.includes("@") && text.includes("href="))
          )
      )
      .join(" ");

    let finalTweet = finalTweetsData.data.filter((tweet) => tweet.id === tweetOnThreadId)[0];

    if (finalTweet) {
      finalTweet.replies.push(replyData);
    }
  }

  return finalTweetsData;
}

module.exports = { processSearchResponse, processReplies, updateReplies };
