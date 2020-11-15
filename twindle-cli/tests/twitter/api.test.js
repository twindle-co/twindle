const { getTweetById, getConversationById } = require("../../src/twitter/api");
const { ApiErrors } = require("../../src/twitter/error");

describe("api module", () => {
  it("should throw an error if called without tweet id", () => {
    expect(() => getTweetById()).toThrow(ApiErrors.TweetIDNotProvidedError);
    expect(() => getConversationById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });

  // it("#getConversationByID() should throw error if screen name not provided", () => {
  //   expect(() => getConversationById("1324263512621883393", undefined, "API Key")).toThrow(
  //     ApiErrors.UserScreenNameInvalid
  //   );
  // });

  // see https://github.com/facebook/jest/issues/5538#issuecomment-461013424
  // it("should throw an error if called without token", async () => {
  //   await expect(() => getTweetById("1324263512621883393")).rejects.toThrow(
  //     ApiErrors.TokenNotProvidedError
  //   );
  //   await expect(() => getConversationById("1324263512621883393")).rejects.toThrow(
  //     ApiErrors.TokenNotProvidedError
  //   );
  // });
});
