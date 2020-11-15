// @ts-check
const { getConversationById, getTweetById } = require("./api");

const Scraping = require("./scraping");

// const { firstTweet, finalProcessedTweet } = require("./test/data");
const TweetEndpointValidation = require("./validations/tweet-endpoint");

const TweetEndpointTransformation = require("./transformations/tweet-endpoint");
const TweetArrayEndpointTransformation = require("./transformations/tweets-array-endpoint");
const SearchEndpointTransformation = require("./transformations/search-endpoint");
const UserTimelineEndpointTransformation = require("./transformations/user-timeline-endpoint");

const { ValidationErrors } = require("./error");
const { getUserTweets } = require("./api/twitter-endpoints/user_timeline");

/** @param {Partial<TwitterConversationResponse>} response */
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
      // console.log(1);
    } else if (validation.error instanceof ValidationErrors.TweetOlderThan7DaysError) {
      const tweetIDs = await Scraping.getTweetIDs(id);
      // console.log(2);
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

  return [finalTweetsData];
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
  let finalTweetsData = await TweetArrayEndpointTransformation.processTweetsArray(
    responseJSON.data,
    token
  );
  return [finalTweetsData];
};

/**
 * @param {string} screenName
 * @param {string} token
 */
const getTweetsFromUser = async (screenName, token) => {
  let responseJSON = await getUserTweets(screenName, token);

  if (responseJSON.status === "error") {
    throw new Error("something wrong");
  }
  // do processing
  let finalTweetsData = await UserTimelineEndpointTransformation.processUserTweets(
    screenName,
    responseJSON.data,
    token
  );
  return [finalTweetsData];
};

/**
 * @param {string} ids
 * @param {string} token
 */
const getTweetsFromThreads = async (ids, token) => {
  let { data: responseJSON, status } = await getTweetById(ids, token);

  if (status === "error") {
    throw new Error("something wrong");
  }

  //console.log(responseJSON.data.includes);
  /** @type {TwitterConversationData[]}  */
  const tweets = (responseJSON.data || []).map((resData) => ({
    ...resData,
    includes: responseJSON.includes,
  }));

  /** @type {CustomTweetsObject[]} */
  const tweetThreads = [];

  /** @type {string[]} */
  const userIds = [];

  for (let loopTweet of tweets) {
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

    // do validation
    // @Mira-Alf processResponse checks into the `errors` field to check if the tweet exists or not. What
    // do we do to do that check now?
    const validation = TweetEndpointValidation.processResponse({ data: [loopTweet] });

    if (validation.status === "error") {
      if (validation.error instanceof ValidationErrors.TweetNotFirstOfThreadError) {
        const id = getConversationId({ data: [loopTweet] });
        loopTweet = (await getTweetById(loopTweet.id, token)).data[0];
        // console.log(1);
      } else if (validation.error instanceof ValidationErrors.TweetOlderThan7DaysError) {
        const tweetIDs = await Scraping.getTweetIDs(loopTweet.id);
        // console.log(2);
        tweetThreads.push(...(await getTweetsFromArray(tweetIDs, token)));
      } else throw validation.error;
    }
    // do processing
    const {
      resp: transformedFirstTweet,
      tweet,
      user,
    } = await TweetEndpointTransformation.processTweetLookup(
      { data: [loopTweet], includes: loopTweet.includes },
      token
    );

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
    if (!userIds.includes(finalTweetsData.common.user.name))
      userIds.push(finalTweetsData.common.user.name);
    tweetThreads.push(finalTweetsData);
  }
  //console.log(userIds);
  for (let userId of userIds) {
    const tts = tweetThreads.filter((thread) => thread.common.user.name === userId);
    if (tts.length > 1) for (let i = 1; i < tts.length; i++) delete tts[i].common.user;
  }
  //console.log(tweetThreads);
  return tweetThreads;
};

module.exports = {
  getTweetsById,
  getTweetsFromArray,
  getTweetsFromUser,
  getTweetsFromThreads,
};
