const { ApiErrors } = require("../../../../../src/twitter/error");
const { getTweetById } = require("../../../../../src/twitter/api/twitter-endpoints/tweets");

describe("twitter |> api |> twitter-endpoints |> tweets module", () => {
  it("should throw error if tweet id is falsey", () => {
    expect(() => getTweetById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });
});
