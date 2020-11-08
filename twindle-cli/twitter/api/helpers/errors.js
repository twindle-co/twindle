const { UserError } = require("../../../helpers/error");

class NetworkRequestError extends UserError {
  constructor() {
    super(
      "twitter-api:request-failed",
      "Request failed. Check your network and try again"
    );
  }
}

class TokenNotProvidedError extends UserError {
  constructor() {
    super("twitter-api:token-not-passed", "Please provide the token");
  }
}

class TweetIDNotProvidedError extends UserError {
  constructor() {
    super("twitter-api:tweet-id-not-passed", "Please provide the tweet id");
  }
}

module.exports = {
  NetworkRequestError,
  TokenNotProvidedError,
  TweetIDNotProvidedError,
};
