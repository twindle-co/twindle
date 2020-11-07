const { UserError } = require("../../../../../twindle-cli/helpers/error");

class NetworkRequestError extends UserError {
  constructor() {
    super("request-failed", "Request failed. Check your network and try again");
  }
}

module.exports = { NetworkRequestError };
