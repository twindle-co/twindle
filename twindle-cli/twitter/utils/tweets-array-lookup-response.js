const { renderRichTweets } = require("./process-tweet-entities");
const { addTweet, addCommon, collectTweets } = require("./tweet-info");
const { createCustomTweet  } = require("./tweet-utils");

async function processTweetsArrayResponse(responseJSON) {

    const tweets = responseJSON.data;
    const firstTweet = tweets.filter((tweet)=>tweet.id === tweet.conversation_id)[0];
    const userObject = responseJSON.includes.users.filter((user)=>user.id === firstTweet.author_id)[0];
    
    let tweet = renderRichTweets(firstTweet);
    let user = userObject;
  
    // console.log(tweet);
    addCommon(tweet, user);
  
    addTweet(createCustomTweet(tweet, user));
  
  
    let directReplies = responseJSON.data.filter((tweet)=>tweet.referenced_tweets)
    .filter(
      (tweet) =>
        tweet.referenced_tweets.filter(
          (ref) => ref.type == "replied_to" && ref.id == firstTweet.conversation_id
        ).length > 0
    );
  
    while (directReplies.length > 0) {
      let reply_id = directReplies[0].id;
  
      addTweet(createCustomTweet(renderRichTweets(directReplies[0])));
      directReplies = responseJSON.data.filter((tweet)=>tweet.referenced_tweets)
      .filter(
        (tweet) =>
          tweet.referenced_tweets.filter((ref) => ref.type == "replied_to" && ref.id == reply_id)
            .length > 0
      );
    }
  
}

module.exports = { processTweetsArrayResponse };