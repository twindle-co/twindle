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

class BadTwitterRequestError extends TwitterError {
  constructor() {
    super(
      "bad-request",
      "Invalid request parameters. This error happens most likely because of invalid tweet id"
    );
  }
}

class TwitterServiceError extends TwitterError {
  constructor() {
    super(
      "twitter-service-error",
      "Try later. Twitter is facing issues with too many requests or the access token limits were reached."
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
  BadTwitterRequestError,
  TwitterServiceError,
  TweetDoesNotExist,
};
