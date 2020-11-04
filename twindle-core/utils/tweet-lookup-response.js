const { processMediaFromTweet } = require("./process-tweet-entities");
const { addTweet, addCommon, collectTweets } = require("./tweet-info");
const { getTweetObject, getUserObject, createCustomTweet } = require("./tweet-utils");
const { doTweetsSearch } = require("./tweets-search-request");

/**
 *
 * @param {any} responseJSON
 */
async function processTweetLookup(responseJSON) {
  let tweet = getTweetObject(responseJSON);
  let user = getUserObject(responseJSON);

  addCommon(tweet, user);

  addTweet(createCustomTweet(tweet, user));

  await processMediaFromTweet(responseJSON);

  await doTweetsSearch(tweet.conversation_id, user.username);

  // console.log(collectTweets().data);

  return collectTweets();
}

module.exports = {
  processTweetLookup,
};
