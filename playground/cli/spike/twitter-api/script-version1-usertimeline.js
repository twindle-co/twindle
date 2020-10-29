const { url } = require("inspector");
const fetch = require("node-fetch");

const BEARER_TOKEN = 'Bearer <Auth_Token_Here>';
const TWEET_LOOKUP_ENDPOINT = 'https://api.twitter.com/1.1/statuses/show.json?id=<tweet_id>&tweet_mode=extended';
const USER_TIMELINE_ENDPOINT = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=<screen_name>&since_id=<tweet_id>&tweet_mode=extended&count=200';
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
        url = TWEET_LOOKUP_ENDPOINT.replace("<tweet_id>", tweet_id);
    else if(url_type == 'search-tweets') {
        url = USER_TIMELINE_ENDPOINT.replace("<tweet_id>", tweet_id);
        url = url.replace("<screen_name>", screen_name);
    }
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
    var tweet = getTweetObject(responseJSON);
    if(isTweetNotOlderThanSevenDays(tweet)) {
        createCustomTweet(getTweetObject(responseJSON), getUserObject(responseJSON));
        var url_type = 'search-tweets';
        var url = getURL(url_type);
        fetchURL(url, url_type);
    }
}

function processSearchResponse(responseJSON) {
    var directReply = getTweetArray(responseJSON).filter((tweet)=>
        tweet.in_reply_to_screen_name == screen_name && tweet.in_reply_to_status_id_str == tweet_id);
    while(directReply.length > 0) {
        var tweet = directReply[0];
        var replyId = tweet.id_str;
        createCustomTweet(tweet, tweet.user);
        directReply = getTweetArray(responseJSON).filter((tweet)=>
            tweet.in_reply_to_screen_name == screen_name && tweet.in_reply_to_status_id_str == replyId);
    }
    console.log(tweets);
    console.log(tweets.length);
}

function getTweetObject(responseJSON) {
    return responseJSON;
}

function getTweetArray(responseJSON) {
    return responseJSON;
}

function getUserObject(responseJSON) {
    return responseJSON.user;
}

function createCustomTweet(tweet_object, user_object) {
    var customTweet = {};
    customTweet.name = user_object.name;
    customTweet.twitterHandle = user_object.screen_name;
    customTweet.image = user_object.profile_image_url_https;
    customTweet.createdAt = tweet_object.created_at;
    customTweet.tweet = tweet_object.full_text;
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
