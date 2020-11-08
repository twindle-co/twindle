const { getTweetById, getConversationById } = require("../api");
const Errors = require("../api/helpers/errors");

describe("api module", () => {
  it("should throw an error if called without tweet id", () => {
    expect(() => getTweetById()).toThrow(Errors.TweetIDNotProvidedError);
    expect(() => getConversationById()).toThrow(Errors.TweetIDNotProvidedError);
  });

  it("should throw an error if called without token", () => {
    expect(() => getTweetById("tweetId")).toThrow(Errors.TokenNotProvidedError);
    expect(() => getConversationById("tweetId")).toThrow(
      Errors.TokenNotProvidedError
    );
  });
});
