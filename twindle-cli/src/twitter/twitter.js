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
    token);
  return [ finalTweetsData ];
};

/**
 * @param {string} screenName
 * @param {string} token
 */
async function getTweetsFromUser(screenName, token) {
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
}

const getTweetsFromThreads = async (ids, token) => {
  let responseJSON = await getTweetById(ids, token);

  if (responseJSON.status === "error") {
    throw new Error("something wrong");
  }
  //console.log(responseJSON.data.includes);
  const tweets = (responseJSON.data.data || []).map((resData) => ({
    ...resData,
    includes: responseJSON.data.includes
  }));
  
  const tweetThreads = [];

  /** @type {string[]} */
  const usersNames = [];

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
    const validation = TweetEndpointValidation.processResponse({data:[loopTweet]});

    if (validation.status === "error") {
      if (validation.error instanceof ValidationErrors.TweetNotFirstOfThreadError) {
        // const id = getConversationId({ data: [loopTweet] });
        loopTweet = (await getTweetById(loopTweet.conversation_id, token)).data[0];
      } else if (validation.error instanceof ValidationErrors.TweetOlderThan7DaysError) {
        const tweetIDs = await Scraping.getTweetIDs(loopTweet.id);
        tweetThreads.push(...(await getTweetsFromArray(tweetIDs, token)));
      } else throw validation.error;
    }
    // do processing
    const {
      resp: transformedFirstTweet,
      tweet,
      user,
    } = await TweetEndpointTransformation.processTweetLookup({data:[loopTweet], includes: loopTweet.includes }, token);

    finalTweetsData = { ...finalTweetsData, ...transformedFirstTweet };
    //get second api
    const conversationTweetsData = await getConversationById(
      tweet.conversation_id,
      user.username,
      token
    );

    const transformedSecondTweets = await SearchEndpointTransformation
    .processSearchResponse(
      conversationTweetsData.data,
      token
    );

    finalTweetsData = {
      ...finalTweetsData,
      data: [...finalTweetsData.data, ...transformedSecondTweets],
    };

    finalTweetsData.common.count = finalTweetsData.data.length;

    if (!usersNames.includes(finalTweetsData.common.user.name)) {
      usersNames.push(finalTweetsData.common.user.name);
    }

    tweetThreads.push(finalTweetsData);
  }
  //console.log(userIds);
  for (let usersName of usersNames) {
    const tts = tweetThreads.filter((thread) => thread.common.user.name === usersName);
    if (tts.length > 1) for (let i = 1; i < tts.length; i++) delete tts[i].common.user;
  }
  //console.log(tweetThreads);
  return tweetThreads;
};

module.exports = {
  getTweetsFromArray,
  getTweetsFromUser,
  getTweetsFromThreads
};
