// @ts-check
import { getConversationById, getTweetById } from "./api";

import { getTweetIDsScraping } from "./scraping";

// const { firstTweet, finalProcessedTweet } = require("./test/data");
import TweetEndpointValidation from "./validations/tweet-endpoint";

import { processTweetLookup } from "./transformations/tweet-endpoint";
import { processTweetsArray } from "./transformations/tweets-array-endpoint";
import { processSearchResponse } from "./transformations/search-endpoint";
import { processUserTweets } from "./transformations/user-timeline-endpoint";

import { ValidationErrors } from "./error";
import { getUserTweets } from "./api/twitter-endpoints/user_timeline";

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
      const tweetIDs = await getTweetIDsScraping(id);
      const tweets = await getTweetsFromArray(tweetIDs, token);
      return tweets;
    } else throw validation.error;
  }

  // do processing
  const { resp: transformedFirstTweet, tweet, user } = await processTweetLookup(
    firstTweet.data,
    token
  );

  finalTweetsData = { ...finalTweetsData, ...transformedFirstTweet };

  //get second api
  const conversationTweetsData = await getConversationById(
    tweet.conversation_id,
    user.username,
    token
  );

  const transformedSecondTweets = await processSearchResponse(conversationTweetsData.data, token);

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
  return await processTweetsArray(responseJSON.data, token);
};

const getTweetsFromUser = async (screenName, token) => {
  let responseJSON = await getUserTweets(screenName, token);

  if (responseJSON.status === "error") {
    throw new Error("something wrong");
  }
  // do processing
  return await processUserTweets(screenName, responseJSON.data, token);
};

export { getTweetsById, getTweetsFromArray, getTweetsFromUser };
