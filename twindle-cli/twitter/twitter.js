const { getConversationById, getTweetById } = require("./api");

// const { firstTweet, finalProcessedTweet } = require("./test/data");
const TweetEndpointValidation = require("./validations/tweet-endpoint");

const TweetEndpointTransformation = require("./transformations/tweet-endpoint");
const TweetArrayEndpointTransformation = require("./transformations/tweets-array-endpoint");
const SearchEndpointTransformation = require("./transformations/search-endpoint");

const { ValidationErrors } = require("./error");

/** @param {TwitterConversationResponse} response */
const getConversationId = (response) => response.data[0].conversation_id;

/**
 * 
 * @param {string} id 
 * @param {*} token 
 */
const getTweetsById = async (id, token) => {
  let finalTweetsData = {
    common: {
      created_at: "",
      count: "",
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
    } else throw validation.error;
  }

  // do processing
  const [transformedFirstTweet, tweet, user] = TweetEndpointTransformation.processTweetLookup(
    firstTweet.data
  );

  finalTweetsData = { ...finalTweetsData, ...transformedFirstTweet };

  //get second api
  const conversationTweetsData = await getConversationById(
    tweet.conversation_id,
    user.username,
    token
  );

  const transformedSecondTweets = SearchEndpointTransformation.processSearchResponse(
    conversationTweetsData.data
  );

  finalTweetsData = {
    ...finalTweetsData,
    data: [...finalTweetsData.data, ...transformedSecondTweets],
  };

  return finalTweetsData;
};

const getTweetsFromArray = async (ids, token) => {
  let responseJSON = await getTweetById(ids.join(","), token);

  if (responseJSON.status === "error") {
    throw new Error("something wrong");
  }

  // do processing
  return TweetArrayEndpointTransformation.processTweetsArray(responseJSON);
};

module.exports = {
  getTweetsById,
  getTweetsFromArray,
};
