const { UserError } = require("../../helpers/error");

class TwitterError extends UserError {
  constructor(name, message) {
    super("twitter-api:" + name, message);
  }
}

module.exports = {
  TwitterError,
};
