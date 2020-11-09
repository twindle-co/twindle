//  possibly include env related errors in a single location here
const { UserError } = require("../../helpers/error");

const twitterAuthToken = process.env.TWITTER_AUTH_TOKEN;

if (!twitterAuthToken)
  throw new UserError(
    "bearer-token-not-provided",
    "Please ensure that you have a .env file containing a value for TWITTER_AUTH_TOKEN"
  );

const BEARER_TOKEN = "Bearer " + twitterAuthToken;
module.exports = { BEARER_TOKEN };
