const { TwitterError } = require("./base");

class TweetDeletedError extends TwitterError {
  constructor() {
    super("tweet-deleted", "Cannot fetch details of this tweet.");
  }
}

class TweetOlderThan7DaysError extends TwitterError {
  constructor() {
    super("tweet-older-than-7-days", "The tweet must not be older than 7 days.");
  }
}

class TweetNotFirstOfThreadError extends TwitterError {
  constructor() {
    super("tweet-not-first-of-thread", "The provided tweet is not the first of the thread.");
  }
}

module.exports = {
  TweetDeletedError,
  TweetOlderThan7DaysError,
  TweetNotFirstOfThreadError,
};
