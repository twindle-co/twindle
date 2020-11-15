const { ApiErrors } = require("../../error");
const { getTweetById } = require("./tweets");

describe("twitter |> api |> twitter-endpoints |> tweets module", () => {
  it("should throw error if tweet id is falsey", () => {
    expect(() => getTweetById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });
});
