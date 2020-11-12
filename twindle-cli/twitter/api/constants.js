const TWEET_FIELDS =
  "&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at," +
  "entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets," +
  "source,withheld";
const EXPANSIONS = "&expansions=author_id,attachments.media_keys";
const USER_FIELDS =
  "&user.fields=created_at,description,entities,location,pinned_tweet_id,profile_image_url,protected,public_metrics,url,verified,withheld";
const MEDIA_FIELDS =
  "&media.fields=duration_ms,height,preview_image_url,url,media_key,public_metrics,width";
const PLACE_FIELDS = "&place.fields=contained_within,country,country_code,geo,name,place_type";
const POLL_FIELDS = "&poll.fields=duration_minutes,end_datetime,voting_status";
const MAX_RESULTS = "&max_results=100";

const getCommonFields = () =>
  `${TWEET_FIELDS}${EXPANSIONS}${USER_FIELDS}${MEDIA_FIELDS}${PLACE_FIELDS}${POLL_FIELDS}`;

module.exports = {
  getCommonFields,
  MAX_RESULTS,
};
