const { BEARER_TOKEN } = require("./twitter-api-keys");

const { UserError } = require("../../helpers/error");

const { getTweetObject, checkIfRequestSuccessful, getUrl } = require("./tweet-utils");
const { processTweetLookup } = require("./tweet-lookup-response");
const fetch = require("node-fetch");

const getRequestOptions = () => {
  return {
    method: "GET",
    headers: { Authorization: BEARER_TOKEN },
    redirect: "follow",
  };
};

const isProvidedTweetFirstTweetOfTheThread = (tweet) => tweet.id === tweet.conversation_id;

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

/**
 *
 * @param {string} tweet_id
 */
async function doTweetLookup(tweet_id) {
  try {
    /** @type {Response} */
    const response = await fetch(getUrl(tweet_id), getRequestOptions());
    return await processResponse(response);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Process the data received from Twitter API
 * @param {Response} response
 */
async function processResponse(response) {
  if (!checkIfRequestSuccessful(response)) {
    console.log(await response.json());

    throw new UserError("request-failed", "Request failed. Check your network and try again");
  }

  let responseJSON = await response.json();

  if (isTweetDeleted(responseJSON)) {
    throw new UserError("tweet-deleted", "Cannot fetch details of this tweet.");
  }

  let tweet = getTweetObject(responseJSON);

  if (!isTweetNotOlderThanSevenDays(tweet)) {
    throw new UserError("tweet-older-than-7-days", "The tweet must not be older than 7 days.");
  }

  if (!isProvidedTweetFirstTweetOfTheThread(tweet)) {
    // This ain't the first tweet of the thread. Find out the first of this thread
    await doTweetLookup(tweet.conversation_id);
  } else {
    await processTweetLookup(responseJSON);
  }
}

module.exports = { doTweetLookup };
