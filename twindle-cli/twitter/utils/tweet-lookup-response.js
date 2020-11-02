const { addTweet } = require("./tweet-info");
const { getTweetObject, getUserObject, createCustomTweet } = require("./tweet-utils");
const { doTweetsSearch } = require("./tweets-search-request");

async function processTweetLookup(responseJSON) {
    let tweet = getTweetObject(responseJSON);
    let user = getUserObject(responseJSON);
    addTweet(createCustomTweet(tweet, user));
    await doTweetsSearch(tweet.conversation_id, user.username);
}
  
module.exports = {
    processTweetLookup
}
  