const { ApiErrors } = require("../../../../../src/twitter/error");
const { fetch } = require("../../../../../src/twitter/api/helpers/fetch");

const mockURL =
  "https://api.twitter.com/2/tweets?ids=1326680823559380992,1325817877585387521&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,withheld&expansions=author_id,attachments.media_keys&user.fields=created_at,description,entities,location,pinned_tweet_id,profile_image_url,protected,public_metrics,url,verified,withheld&media.fields=duration_ms,height,preview_image_url,url,media_key,public_metrics,width&place.fields=contained_within,country,country_code,geo,name,place_type&poll.fields=duration_minutes,end_datetime,voting_status";

describe("twitter |> api |> helpers |> fetch module", () => {
  it("should throw error if called without token", async () => {
    await expect(() => fetch(mockURL)).rejects.toThrow(ApiErrors.TokenNotProvidedError);
  });

  it("should throw error if token is invalid", async () => {
    await expect(() => fetch(mockURL, "blah blah blah")).rejects.toThrow(
      ApiErrors.InvalidTokenError
    );
  });
});
