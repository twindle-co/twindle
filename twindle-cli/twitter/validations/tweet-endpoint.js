//  options for the tweet endpoint
const { ValidationErrors, ApiErrors } = require("../error");

/**
 *
 * @param {TwitterConversationData} tweet
 */
const isFirstTweetOfThread = (tweet) => {
  return tweet.id === tweet.conversation_id;
};

/** @param {TwitterConversationData} tweet */
const tweetOlderThanSevenDays = (tweet) => {
  const currentTime = +new Date();
  const tweetCreatedAt = +new Date(tweet.created_at);

  const differenceInDays = (currentTime - tweetCreatedAt) / (1000 * 3600 * 24);
  return differenceInDays > 7;
};

/** @param {TwitterConversationResponse} responseJSON */
const tweetDeleted = (responseJSON) => {
  if (responseJSON.errors === undefined) return false;
  return true;
};

/** @param {TwitterConversationResponse} responseJSON */
const getTweetObject = (responseJSON) => {
  return {
    ...responseJSON.data[0],
    includes: responseJSON.includes,
  };
};

/**
 * Process the data received from Twitter API
 * @param {TwitterConversationResponse} response
 */
function processResponse(response) {
  if (tweetDeleted(response)) {
    return {
      status: "error",
      error: new ApiErrors.TweetDoesNotExist(),
    };
  }
  let tweet = getTweetObject(response);

  if (tweetOlderThanSevenDays(tweet)) {
    return {
      status: "error",
      error: new ValidationErrors.TweetOlderThan7DaysError(),
    };
  }

  if (!isFirstTweetOfThread(tweet)) {
    // This ain't the first tweet of the thread. Find out the first of this thread
    // await doTweetLookup(tweet.conversation_id);
    return {
      status: "error",
      error: new ValidationErrors.TweetNotFirstOfThreadError(),
    };
  }

  return {
    status: "ok",
  };
}

module.exports = {
  processResponse,
};
