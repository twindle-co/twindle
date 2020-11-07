const { BEARER_TOKEN } = require("./twitter-api-keys");

const { UserError } = require("../../helpers/error");

const { getTweetObject, checkIfRequestSuccessful, getUrl } = require("./tweet-utils");
const { processTweetsArrayResponse } = require("./tweets-array-lookup-response");
const fetch = require("node-fetch");

const getRequestOptions = () => {
  return {
    method: "GET",
    headers: { Authorization: BEARER_TOKEN },
    redirect: "follow",
  };
};

/**
 *
 * @param {string} tweet_id
 */
async function doTweetsLookup(tweet_ids) {
  try {
    /** @type {Response} */
    const response = await fetch(getUrl(tweet_ids.join(",")), getRequestOptions());
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
  processTweetsArrayResponse(responseJSON);



}

module.exports = { doTweetsLookup };
