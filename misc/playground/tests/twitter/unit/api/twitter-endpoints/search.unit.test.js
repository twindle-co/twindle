const { ApiErrors } = require("../../../../../src/twitter/error");
const { getConversationById } = require("../../../../../src/twitter/api/twitter-endpoints/search");

describe("twitter |> api |> twitter-endpoints |> search", () => {
  it("should throw error if ID is falsey(undefined, null, false, etc)", () => {
    expect(() => getConversationById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });

  it("should throw error if screenName is falsey", () => {
    expect(() => getConversationById("Tweet ID")).toThrow(ApiErrors.UserScreenNameInvalid);
  });
});
