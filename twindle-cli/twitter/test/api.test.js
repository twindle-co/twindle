const { getTweetById, getConversationById } = require("../api");
const { ApiErrors } = require("../error");

describe("api module", () => {
  it("should throw an error if called without tweet id", () => {
    expect(() => getTweetById()).toThrow(ApiErrors.TweetIDNotProvidedError);
    expect(() => getConversationById()).toThrow(
      ApiErrors.TweetIDNotProvidedError
    );
  });

  it("should throw an error if called without token", () => {
    expect(() => getTweetById("tweetId")).toThrow(
      ApiErrors.TokenNotProvidedError
    );
    expect(() => getConversationById("tweetId")).toThrow(
      ApiErrors.TokenNotProvidedError
    );
  });
});
