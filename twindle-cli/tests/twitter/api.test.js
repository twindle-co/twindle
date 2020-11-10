const { getTweetById, getConversationById } = require("../../twitter/api");
const { ApiErrors } = require("../../twitter/error");

describe("api module", () => {
  it("should throw an error if called without tweet id", () => {
    expect(() => getTweetById()).toThrow(ApiErrors.TweetIDNotProvidedError);
    expect(() => getConversationById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });

  it("should throw an error if called without token", async () => {
    await expect(() => getTweetById("1324263512621883393")).rejects.toThrow(
      ApiErrors.TokenNotProvidedError
    );
    await expect(() => getConversationById("1324263512621883393")).rejects.toThrow(
      ApiErrors.TokenNotProvidedError
    );
  });
});
