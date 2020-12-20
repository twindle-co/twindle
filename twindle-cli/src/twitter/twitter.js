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

const spinner = require("../spinner");

/**
 * @param {Object} param
 * @param {number} param.initial
 * @param {number} param.final
 */
function counter({ initial, final }) {
  let current = initial - 1;

  function increment() {
    current++;

    spinner.text = `Fetching ${current} of ${final} thread${final !== 1 ? "s" : ""}      `;
  }

  return { increment };
}

/**
 * @param {string[]} ids
 * @param {string} token
 */
const getTweetsFromArray = async (ids, includeReplies, token) => {
  let responseJSON = await getTweetById(ids.join(","), token);

  if (responseJSON.status === "error") {
    throw new Error("something wrong");
  }

  // do processing
  let finalTweetsData = await TweetArrayEndpointTransformation.processTweetsArray(
    responseJSON.data,
    token
  );

  if (includeReplies) {
    let replies = await TweetArrayEndpointTransformation.processReplies(responseJSON.data, token);
    let replyIds = replies.map((r) => r.id);

    if (replyIds.length > 0) {
      responseJSON = await getTweetById(replyIds.join(","), token);

      if (responseJSON.data && !responseJSON.data.errors) {
        finalTweetsData = await TweetArrayEndpointTransformation.updateReplies(
          responseJSON.data,
          replies,
          finalTweetsData,
          token
        );
      }
    }
  }
  return [finalTweetsData];
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

/**
 * @param {string} ids
 * @param {string} token
 */
const getTweetsFromThreads = async (ids, includeReplies, token) => {
  const { increment } = counter({ initial: 1, final: ids.split(",").length });

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

  /** @type {import("./types/types").CustomTweets[]} */
  const tweetThreads = [];

  /** @type {string[]} */
  const usersNames = [];

  for (let loopTweet of tweets) {
    increment();

    /** @type {import("./types/types").CustomTweets} */
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
        // const id = getConversationId({ data: [loopTweet] });
        loopTweet = (await getTweetById(loopTweet.conversation_id, token)).data[0];
      } else if (validation.error instanceof ValidationErrors.TweetOlderThan7DaysError) {
        const tweetIDs = await Scraping.getTweetIDs(loopTweet.id);
        // @ts-ignore
        tweetThreads.push(...(await getTweetsFromArray(tweetIDs, includeReplies, token)));
        continue;
      } else throw validation.error;
    }

    // Do processing
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

    let transformedSecondTweets = [];

    if (conversationTweetsData.data.meta.result_count !== 0) {
      transformedSecondTweets = await SearchEndpointTransformation.processSearchResponse(
        conversationTweetsData.data,
        token
      );
    }

    finalTweetsData = {
      ...finalTweetsData,
      data: [...finalTweetsData.data, ...transformedSecondTweets],
    };

    finalTweetsData.common.count = finalTweetsData.data.length;

    if (!usersNames.includes(finalTweetsData.common.user.name)) {
      usersNames.push(finalTweetsData.common.user.name);
    }

    if (includeReplies) {
      /** @type {Reply[]} */
      let replies = await SearchEndpointTransformation.processReplies(
        conversationTweetsData.data,
        token
      );

      let replyIds = replies.map(({ id }) => id);
      if (replyIds.length > 0) {
        const repliesResponse = await getTweetById(replyIds.join(","), token);

        // console.log(responseJSON);

        if (repliesResponse.data && !repliesResponse.data.errors) {
          finalTweetsData = await SearchEndpointTransformation.updateReplies(
            repliesResponse.data,
            replies,
            finalTweetsData,
            token
          );
        }
      }
    }

    // console.log(finalTweetsData);

    tweetThreads.push(finalTweetsData);
  }

  // Remove duplicates generating due to puppeteer scraping
  return tweetThreads;
};

module.exports = {
  getTweetsFromArray,
  getTweetsFromUser,
  getTweetsFromThreads,
};
