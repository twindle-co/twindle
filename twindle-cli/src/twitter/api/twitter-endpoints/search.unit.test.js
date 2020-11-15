const { ApiErrors } = require("../../error");
const { getConversationById } = require("./search");

describe("twitter |> api |> twitter-endpoints |> search", () => {
  it("should throw error if ID is falsey(undefined, null, false, etc)", () => {
    expect(() => getConversationById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });

  it("should throw error if screenName is falsey", () => {
    expect(() => getConversationById("Tweet ID")).toThrow(ApiErrors.UserScreenNameInvalid);
  });
});
