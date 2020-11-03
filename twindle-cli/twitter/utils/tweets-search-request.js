const { BEARER_TOKEN } = require("./twitter-api-keys");
const {
  ENDPOINT_TO_FETCH_CONVERSATION_TWEETS,
  TWEET_FIELDS,
  USER_FIELDS,
  MEDIA_FIELDS,
  POLL_FIELDS,
  PLACE_FIELDS,
  EXPANSIONS,
  MAX_RESULTS,
} = require("./twitter-endpoints");

const { processSearchResponse } = require("./tweets-search-response");
const { checkIfRequestSuccessful } = require("./tweet-utils");
const fetch = require("node-fetch");
const { UserError } = require("../../helpers/error");

async function doTweetsSearch(conversation_id, screen_name) {
  try {
    // console.log(getUrl(conversation_id, screen_name));
    /** @type {Response} */
    const response = await fetch(
      getUrl(conversation_id, screen_name),
      getRequestOptions()
    );
    await processResponse(response);
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {Response} response
 */
async function processResponse(response) {
  if (!checkIfRequestSuccessful(response)) {
    throw new UserError(
      "request-failed",
      "Request failed. Check your network and try again"
    );
  }

  const responseJSON = await response.json();
  processSearchResponse(responseJSON);
}

const getUrl = (conversation_id, screen_name) => {
  let url = ENDPOINT_TO_FETCH_CONVERSATION_TWEETS.replace(
    "<conversation_id>",
    conversation_id
  ).replace("<screen_name>", screen_name);
  url = `${url}${TWEET_FIELDS}${EXPANSIONS}${USER_FIELDS}${MEDIA_FIELDS}${PLACE_FIELDS}${POLL_FIELDS}${MAX_RESULTS}`;
  return url;
};

const getRequestOptions = () => {
  return {
    method: "GET",
    headers: { Authorization: BEARER_TOKEN },
    redirect: "follow",
  };
};
module.exports = { doTweetsSearch };
