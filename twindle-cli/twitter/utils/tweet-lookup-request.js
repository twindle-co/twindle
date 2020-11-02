const { BEARER_TOKEN } = require("./twitter-api-keys");
const { ENDPOINT_TO_FETCH_CONVERSATION_ID, 
    TWEET_FIELDS,
    USER_FIELDS,
    MEDIA_FIELDS,
    POLL_FIELDS,
    PLACE_FIELDS,
    EXPANSIONS} = require("./twitter-endpoints");
const { getTweetObject, 
        checkIfRequestSuccessful } = require("./tweet-utils");
const { processTweetLookup } = require("./tweet-lookup-response");
const fetch = require("node-fetch");  

async function doTweetLookup(tweet_id) {
    try {
        // console.log(getUrl(tweet_id));
        let response = await fetch(getUrl(tweet_id), getRequestOptions());
        await processResponse(response);
    } catch(err) {
        console.log(err);
    }
}

async function processResponse(response) {
    if(checkIfRequestSuccessful(response)) {
        let responseJSON = await response.json();
        let tweet = getTweetObject(responseJSON);
        if(isTweetNotOlderThanSevenDays(tweet)) {
            if(!isProvidedTweetFirstTweetOfTheThread(tweet))
                await doTweetLookup(tweet.conversation_id);
            else
                await processTweetLookup(responseJSON);
        }
    }
}

const getUrl = (tweet_id) => `${ENDPOINT_TO_FETCH_CONVERSATION_ID}${tweet_id}${TWEET_FIELDS}${EXPANSIONS}${USER_FIELDS}${MEDIA_FIELDS}${PLACE_FIELDS}${POLL_FIELDS}`;

const getRequestOptions = () => {
    return {
        method : 'GET',
        headers: { "Authorization" : BEARER_TOKEN },
        redirect: 'follow'
    };
};

const isProvidedTweetFirstTweetOfTheThread = (tweet) => tweet.id === tweet.conversation_id;

const isTweetNotOlderThanSevenDays = (tweet) => {
    let differenceInDays = (new Date().getTime() - new Date(tweet.created_at).getTime())/(1000 * 3600 * 24);
    return  differenceInDays >= 7 ? false : true; 
};

module.exports = { doTweetLookup }