const { TwitterError } = require("./base");

class NetworkRequestError extends TwitterError {
  constructor() {
    super("request-failed", "Request failed. Check your network and try again");
  }
}

class TokenNotProvidedError extends TwitterError {
  constructor() {
    super("token-not-passed", "Please provide the token");
  }
}

class TweetIDNotProvidedError extends TwitterError {
  constructor() {
    super("tweet-id-not-passed", "Please provide the tweet id");
  }
}

module.exports = {
  NetworkRequestError,
  TokenNotProvidedError,
  TweetIDNotProvidedError,
};
