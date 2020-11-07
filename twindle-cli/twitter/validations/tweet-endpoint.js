//  options for the tweet endpoint

const isProvidedTweetFirstTweetOfTheThread = (tweet) =>
  tweet.id === tweet.conversation_id;

const isTweetNotOlderThanSevenDays = (tweet) => {
  const currentTime = +new Date();
  const tweetCreatedAt = +new Date(tweet.created_at);

  const differenceInDays = (currentTime - tweetCreatedAt) / (1000 * 3600 * 24);
  return differenceInDays <= 7;
};

const isTweetDeleted = (responseJSON) => {
  if (responseJSON.errors === undefined) return false;

  return true;
};

const getTweetObject = (responseJSON) => {
  return {
    ...responseJSON.data[0],
    includes: responseJSON.includes,
  };
};

/**
 * Process the data received from Twitter API
 * @param {Response} response
 */
async function processResponse(response) {
  if (isTweetDeleted(responseJSON)) {
    throw new UserError("tweet-deleted", "Cannot fetch details of this tweet.");
  }

  let tweet = getTweetObject(responseJSON);

  if (!isTweetNotOlderThanSevenDays(tweet)) {
    throw new UserError(
      "tweet-older-than-7-days",
      "The tweet must not be older than 7 days."
    );
  }

  if (!isProvidedTweetFirstTweetOfTheThread(tweet)) {
    // This ain't the first tweet of the thread. Find out the first of this thread
    await doTweetLookup(tweet.conversation_id);
  } else {
    await processTweetLookup(responseJSON);
  }
}

module.exports = {
  processResponse,
};
