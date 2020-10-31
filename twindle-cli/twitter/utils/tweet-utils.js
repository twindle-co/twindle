//extract tweet_id from tweet_url
function extractTweetId(tweet_url) {
    return tweet_url.substring(tweet_url.lastIndexOf("/") + 1);
}

//extract screen_name from tweet_url
function extractScreenName(tweet_url) {
    tweet_url = tweet_url.substring(0, tweet_url.lastIndexOf("/status"));
    return tweet_url.substring(tweet_url.lastIndexOf("/") + 1);
}

function getTweetObject(responseJSON) {
  return responseJSON.data[0];
}

function getTweetArray(responseJSON) {
  return responseJSON.data;
}

function getUserObject(responseJSON) {
  return responseJSON.includes.users[0];
}

function createCustomTweet(tweet_object, user_object) {
  var customTweet = {};
  customTweet.name = user_object.name;
  customTweet.twitterHandle = user_object.username;
  customTweet.image = user_object.profile_image_url;
  customTweet.createdAt = tweet_object.created_at;
  customTweet.tweet = tweet_object.text;
  return customTweet;
}

function isTweetNotOlderThanSevenDays(tweet) {
  var dateOfTweet = new Date(tweet.created_at);
  var currentDate = new Date();
  var differenceInDays = (currentDate.getTime() - dateOfTweet.getTime())/(1000*3600*24);
  if(differenceInDays >= 7) {
      console.log("cannot retrieve tweet thread");
      return false;
  }
  return true;
}


module.exports = {extractTweetId, 
                  extractScreenName, 
                  getTweetObject, 
                  getTweetArray, 
                  getUserObject, 
                  createCustomTweet,
                  isTweetNotOlderThanSevenDays};
