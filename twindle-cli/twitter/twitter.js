// @ts-check
const { getConversationById, getTweetById } = require("./api");

const Scraping = require("./scraping");

// const { firstTweet, finalProcessedTweet } = require("./test/data");
const TweetEndpointValidation = require("./validations/tweet-endpoint");

const TweetEndpointTransformation = require("./transformations/tweet-endpoint");
const TweetArrayEndpointTransformation = require("./transformations/tweets-array-endpoint");
const SearchEndpointTransformation = require("./transformations/search-endpoint");

const { ValidationErrors } = require("./error");

/** @param {TwitterConversationResponse} response */
const getConversationId = (response) => response.data[0].conversation_id;

/**
 * @param {string} id
 * @param {string} token
 */
const getTweetsById = async (id, token) => {
  /** @type {CustomTweetsObject} */
  let finalTweetsData = {
    common: {
      id: "",
      created_at: "",
      count: 0,
      user: {
        id: "",
        username: "",
        name: "",
        profile_image_url: "",
        description: "",
      },
    },
    data: [],
  };

  // first get the first api
  let firstTweet = await getTweetById(id, token);

  if (firstTweet.status === "error") {
    throw new Error("something wrong");
  }

  // do validation
  const validation = TweetEndpointValidation.processResponse(firstTweet.data);

  if (validation.status === "error") {
    if (validation.error instanceof ValidationErrors.TweetNotFirstOfThreadError) {
      const id = getConversationId(firstTweet.data);
      firstTweet = await getTweetById(id, token);
    } else if (validation.error instanceof ValidationErrors.TweetOlderThan7DaysError) {
      const tweetIDs = await Scraping.getTweetIDs(id);
      const tweets = await getTweetsFromArray(tweetIDs, token);
      return tweets;
    } else throw validation.error;
  }

  // do processing
  const {
    resp: transformedFirstTweet,
    tweet,
    user,
  } = await TweetEndpointTransformation.processTweetLookup(firstTweet.data, token);

  finalTweetsData = { ...finalTweetsData, ...transformedFirstTweet };

  //get second api
  const conversationTweetsData = await getConversationById(
    tweet.conversation_id,
    user.username,
    token
  );

  const transformedSecondTweets = await SearchEndpointTransformation.processSearchResponse(
    conversationTweetsData.data,
    token
  );

  finalTweetsData = {
    ...finalTweetsData,
    data: [...finalTweetsData.data, ...transformedSecondTweets],
  };
  finalTweetsData.common.count = finalTweetsData.data.length;

  return finalTweetsData;
};

/**
 * @param {string[]} ids
 * @param {string} token
 */
const getTweetsFromArray = async (ids, token) => {
  let responseJSON = await getTweetById(ids.join(","), token);

  if (responseJSON.status === "error") {
    throw new Error("something wrong");
  }

  // do processing
  return await TweetArrayEndpointTransformation.processTweetsArray(responseJSON.data, token);
};

module.exports = {
  getTweetsById,
  getTweetsFromArray,
};
