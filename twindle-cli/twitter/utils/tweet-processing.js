const { ENDPOINT_TO_FETCH_CONVERSATION_ID, 
  ENDPOINT_TO_FETCH_CONVERSATION_TWEETS, 
  TWEET_FIELDS,
  USER_FIELDS,
  MEDIA_FIELDS,
  POLL_FIELDS,
  PLACE_FIELDS,
  EXPANSIONS } = require("./twitter-endpoints");
const { getTweetId, 
        getConversationId, 
        getScreenName, 
        setConversationId, 
        addTweet, 
        writeTweets} = require("./tweet-info");
const { getTweetObject, 
        getUserObject,
        getTweetArray,
        isTweetNotOlderThanSevenDays,
        createCustomTweet } = require("./tweet-utils");
const { BEARER_TOKEN } = require("./twitter-api-keys");
const fetch = require('node-fetch');

const TWEET_LOOKUP = 'tweet-lookup';
const SEARCH_TWEETS = 'search-tweets';


function computeUrl(url_type) {
  let url = "";
    if (url_type === TWEET_LOOKUP)
      url = ENDPOINT_TO_FETCH_CONVERSATION_ID + getTweetId();
    else if (url_type === SEARCH_TWEETS)
      url = ENDPOINT_TO_FETCH_CONVERSATION_TWEETS
                .replace("<conversation_id>", getConversationId())
                .replace("<screen_name>", getScreenName());
    url += TWEET_FIELDS + EXPANSIONS + USER_FIELDS + MEDIA_FIELDS + PLACE_FIELDS + POLL_FIELDS;
    return url;
}

function processResponse(url_type, responseJSON) {
    if(checkIfRequestSuccessful(responseJSON)) {
      if(url_type === TWEET_LOOKUP)
          processTweetLookup(responseJSON);
      else if(url_type === SEARCH_TWEETS)
          processSearchResponse(responseJSON);
    }
}

function checkIfRequestSuccessful(responseJSON) {
  if(responseJSON.type != undefined) {
    console.log("error", responseJSON);
    return false;
  }
  return true;
}

function processTweetLookup(responseJSON) {
  var tweet = getTweetObject(responseJSON);
  console.log(tweet);
  if(isTweetNotOlderThanSevenDays(tweet)) {
      addTweet(createCustomTweet(getTweetObject(responseJSON), 
                  getUserObject(responseJSON)));
      setConversationId(getTweetObject(responseJSON).conversation_id);
      fetchUrl(computeUrl(SEARCH_TWEETS), SEARCH_TWEETS);
  }    
}

function processSearchResponse(responseJSON) {
  var directReplies = getTweetArray(responseJSON).filter((tweet)=>
      tweet.referenced_tweets.filter((ref)=>ref.type == 'replied_to' && ref.id == getTweetId()).length > 0);
  while(directReplies.length > 0) {
      var reply_id = directReplies[0].id;
      addTweet(createCustomTweet(directReplies[0], 
                      getUserObject(responseJSON)));
      directReplies = getTweetArray(responseJSON).filter((tweet)=>
                          tweet.referenced_tweets.filter((ref)=>
                              ref.type == 'replied_to' && ref.id == reply_id).length > 0);
  }
  writeTweets();
}


async function fetchUrl(url, url_type) {
    var myHeaders = {};
    myHeaders.Authorization = BEARER_TOKEN;
    var requestOptions = {
        method : 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log(url);
    await fetch(url, requestOptions)
            .then((response)=>{
                console.log(response.status);
                if(response.status != 200) {
                    let error = { 
                                    "type" : "error",
                                    "status" : response.status, 
                                    "statusText" : response.statusText
                                };
                    return error;
                }
                return response.json();
            })
            .then((result)=>processResponse(url_type, result))
            .catch((error)=>console.log("error", error));
}

module.exports = { fetchUrl, computeUrl,
                    processResponse,
                    TWEET_LOOKUP,
                    SEARCH_TWEETS };