<<<<<<< HEAD:twindle-cli/twitter/utils/twitter-api-keys.js
const { exit } = require("yargs");
=======
//  possibly include env related errors in a single location here
>>>>>>> a9fd6f77e2de907238266312f792ea0050b70234:twindle-cli/env.js
const { UserError } = require("../../helpers/error");

const twitterAuthToken = process.env.TWITTER_AUTH_TOKEN;
if (!twitterAuthToken)
  throw new UserError(
    "bearer-token-not-provided",
    "Please ensure that you have a .env file containing a value for TWITTER_AUTH_TOKEN"
  );
const BEARER_TOKEN = "Bearer " + twitterAuthToken;
module.exports = { BEARER_TOKEN };
