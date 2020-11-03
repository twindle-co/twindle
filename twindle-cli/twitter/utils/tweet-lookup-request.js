const { BEARER_TOKEN } = require("./twitter-api-keys");
const {
  ENDPOINT_TO_FETCH_CONVERSATION_ID,
  TWEET_FIELDS,
  USER_FIELDS,
  MEDIA_FIELDS,
  POLL_FIELDS,
  PLACE_FIELDS,
  EXPANSIONS,
} = require("./twitter-endpoints");

const { UserError } = require("../../helpers/error");

const { getTweetObject, checkIfRequestSuccessful } = require("./tweet-utils");
const { processTweetLookup } = require("./tweet-lookup-response");
const fetch = require("node-fetch");
const { writeFile } = require("fs").promises;

/**
 * Returns the API endpoint URL from `tweet_id`
 * @param {string} tweet_id
 */
const getUrl = (tweet_id) =>
  `${ENDPOINT_TO_FETCH_CONVERSATION_ID}${tweet_id}${TWEET_FIELDS}${EXPANSIONS}${USER_FIELDS}${MEDIA_FIELDS}${PLACE_FIELDS}${POLL_FIELDS}`;

/**
 *
 * @param {string} tweet_id
 */
async function doTweetLookup(tweet_id) {
  try {
    // console.log(getUrl(tweet_id));
    /** @type {Response} */
    const response = await fetch(getUrl(tweet_id), getRequestOptions());
    await processResponse(response);
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @param {fetch.Response} response
 */
async function processResponse(response) {
  if (!checkIfRequestSuccessful(response)) {
    throw new UserError(
      "request-failed",
      "Request failed. Check your network and try again"
    );
  }

  let responseJSON = await response.json();
  let tweet = getTweetObject(responseJSON);

  await writeFile(
    `${process.cwd()}/twitter/output/twitter-api-response.json`,
    JSON.stringify(responseJSON),
    "utf8"
  );

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

const getRequestOptions = () => {
  return {
    method: "GET",
    headers: { Authorization: BEARER_TOKEN },
    redirect: "follow",
  };
};

const isProvidedTweetFirstTweetOfTheThread = (tweet) =>
  tweet.id === tweet.conversation_id;

const isTweetNotOlderThanSevenDays = (tweet) => {
  const currentTime = +new Date();
  const tweetCreatedAt = +new Date(tweet.created_at);

  const differenceInDays = (currentTime - tweetCreatedAt) / (1000 * 3600 * 24);
  return differenceInDays <= 7;
};

module.exports = { doTweetLookup };
