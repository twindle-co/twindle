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

class InvalidTokenError extends TwitterError {
  constructor() {
    super(
      "invalid-token",
      "Inavalid Bearer token. Please see if your bearer token in the .env file is valid"
    );
  }
}

class TweetIDNotProvidedError extends TwitterError {
  constructor() {
    super("tweet-id-not-passed", "Please provide the tweet id");
  }
}

class TweetDoesNotExist extends TwitterError {
  constructor() {
    super("tweet-does-not-exists", "Tweet does not exists. PLease check the tweet ID you entered");
  }
}

module.exports = {
  NetworkRequestError,
  TokenNotProvidedError,
  TweetIDNotProvidedError,
  InvalidTokenError,
  TweetDoesNotExist,
};
