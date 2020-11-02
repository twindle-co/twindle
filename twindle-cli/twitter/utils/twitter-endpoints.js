const ENDPOINT_TO_FETCH_CONVERSATION_ID = 'https://api.twitter.com/2/tweets?ids='
const TWEET_FIELDS = '&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,withheld';
const USER_FIELDS = '&user.fields=created_at,description,entities,location,pinned_tweet_id,profile_image_url,protected,public_metrics,url,verified,withheld';
const MEDIA_FIELDS = '&media.fields=duration_ms,height,preview_image_url,public_metrics,width';
const POLL_FIELDS = '&poll.fields=duration_minutes,end_datetime,voting_status';
const PLACE_FIELDS = '&place.fields=contained_within,country,country_code,geo,name,place_type';
const EXPANSIONS = '&expansions=author_id';
const MAX_RESULTS = '&max_results=100';
const ENDPOINT_TO_FETCH_CONVERSATION_TWEETS = 'https://api.twitter.com/2/tweets/search/recent?query=conversation_id:<conversation_id>+from:<screen_name>';

module.exports = {ENDPOINT_TO_FETCH_CONVERSATION_ID, 
                  ENDPOINT_TO_FETCH_CONVERSATION_TWEETS, 
                  TWEET_FIELDS,
                  USER_FIELDS,
                  MEDIA_FIELDS,
                  POLL_FIELDS,
                  PLACE_FIELDS,
                  EXPANSIONS, MAX_RESULTS};