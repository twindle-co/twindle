const { url } = require("inspector");
const fetch = require("node-fetch");
const BEARER_TOKEN = 'Bearer <Auth_Token_Here>';
const ENDPOINT_TO_FETCH_CONVERSATION_ID = 'https://api.twitter.com/2/tweets?ids='
const TWEET_FIELDS = '&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,withheld';
const USER_FIELDS = '&user.fields=created_at,description,entities,location,pinned_tweet_id,profile_image_url,protected,public_metrics,url,verified,withheld';
const MEDIA_FIELDS = '&media.fields=duration_ms,height,preview_image_url,public_metrics,width';
const POLL_FIELDS = '&poll.fields=duration_minutes,end_datetime,voting_status';
const PLACE_FIELDS = '&place.fields=contained_within,country,country_code,geo,name,place_type';
const EXPANSIONS = '&expansions=author_id';
const ENDPOINT_TO_FETCH_CONVERSATION_TWEETS = 'https://api.twitter.com/2/tweets/search/recent?query=conversation_id:<conversation_id>+from:<screen_name>';
const SAMPLE_TWEET = 'https://twitter.com/AriBerman/status/1320872258085310466';
var tweets = [];
var tweet_id = "";
var screen_name = "";
var conversation_id = "";

getTweets(SAMPLE_TWEET);

function getTweetId(tweet_url) {
    return tweet_url.substring(tweet_url.lastIndexOf("/") + 1);
}

function getScreenName(tweet_url) {
    tweet_url = tweet_url.substring(0, tweet_url.lastIndexOf("/status"));
    return tweet_url.substring(tweet_url.lastIndexOf("/")+1);
}

function getURL(url_type) {
    var url = "";
    if(url_type == 'tweet-lookup')
        url += ENDPOINT_TO_FETCH_CONVERSATION_ID + tweet_id;
    else if(url_type == 'search-tweets') {
        url = ENDPOINT_TO_FETCH_CONVERSATION_TWEETS.replace("<conversation_id>", conversation_id);
        url = url.replace("<screen_name>", screen_name);
    }
    url += TWEET_FIELDS + EXPANSIONS + USER_FIELDS + MEDIA_FIELDS + PLACE_FIELDS + POLL_FIELDS;
    return url; 
}

function getTweets(tweet_url) {
    tweet_id = getTweetId(tweet_url);
    screen_name = getScreenName(tweet_url);
    var url_type = 'tweet-lookup';
    var url = getURL(url_type);
    fetchURL(url, url_type);
}

function processResponse(url_type, responseJSON) {
    if(url_type == 'tweet-lookup')
        processTweetLookup(responseJSON);
    else if(url_type == 'search-tweets')
        processSearchResponse(responseJSON);
}

function processTweetLookup(responseJSON) {
    var tweetArray = responseJSON.data;
    var tweet = tweetArray[0];
    if(isTweetNotOlderThanSevenDays(tweet)) {
        createCustomTweet(getTweetObject(responseJSON), getUserObject(responseJSON));
        conversation_id = getTweetObject(responseJSON).conversation_id;
        var url_type = 'search-tweets';
        var url = getURL(url_type);
        fetchURL(url, url_type);
    }    
}

function processSearchResponse(responseJSON) {
    var directReplies = getTweetArray(responseJSON).filter((tweet)=>
        tweet.referenced_tweets.filter((ref)=>ref.type == 'replied_to' && ref.id == tweet_id).length > 0);
    while(directReplies.length > 0) {
        var reply_id = directReplies[0].id;
        createCustomTweet(directReplies[0], getUserObject(responseJSON));
        directReplies = getTweetArray(responseJSON).filter((tweet)=>
                            tweet.referenced_tweets.filter((ref)=>
                                ref.type == 'replied_to' && ref.id == reply_id).length > 0);
    }
    console.log(tweets);
    console.log(tweets.length);
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
    tweets.push(customTweet);
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

async function fetchURL(url, url_type) {
    var myHeaders = {};
    myHeaders.Authorization = BEARER_TOKEN;
    var requestOptions = {
        method : 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log(url);
    await fetch(url, requestOptions)
            .then((response)=>response.json())
            .then((result)=>processResponse(url_type, result))
            .catch((error)=>console.log("error", error));
}
