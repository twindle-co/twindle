const { getConversationById, getTweetById } = require("./api");

const { firstTweet, finalProcessedTweet } = require("./test/data");
const TweetEndpoint = require("./transformations/tweet-endpoint");
const SearchEndpoint = require("./transformations/search-endpoint");

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
  // const firstTweet = await getTweetById(id, token);
  // const tweets = firstTweet;
  // do validation
  // do processing

  const [transformedFirstTweet, tweet, user] = TweetEndpoint.processTweetLookup(
    firstTweet.data
  );
  finalTweetsData = { ...finalTweetsData, ...transformedFirstTweet };

  //get second api
  const conversationTweetsData = await getConversationById(
    tweet.conversation_id,
    user.username,
    token
  );

  const transformedSecondTweets = SearchEndpoint.processSearchResponse(
    conversationTweetsData.data
  );
  // console.log(transformedSecondTweets);

  finalTweetsData = {
    ...finalTweetsData,
    data: [...finalTweetsData.data, ...transformedSecondTweets],
  };
  console.log(JSON.stringify(finalTweetsData));

  // do validation
  // do processing

  return Promise.resolve(finalTweetsData);
};

module.exports = {
  getTweetsById,
};
