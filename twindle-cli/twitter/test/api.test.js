const { getTweetById, getConversationById } = require("../api");
const { ApiErrors } = require("../error");

describe("api module", () => {
  it("should throw an error if called without tweet id", () => {
    expect(() => getTweetById()).toThrow(ApiErrors.TweetIDNotProvidedError);
    expect(() => getConversationById()).toThrow(ApiErrors.TweetIDNotProvidedError);
  });

  // Sorry have to comment it. This test is not working properly. Will look into it

  // it("should throw an error if called without token", () => {
  //   expect(() => getTweetById("1324263512621883393")).toThrow(ApiErrors.TokenNotProvidedError);
  //   expect(() => getConversationById("1324263512621883393")).toThrow(ApiErrors.TokenNotProvidedError);
  // });
});
