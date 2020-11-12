//  possibly include env related errors in a single location here
import { UserError } from "../../helpers/error";

const twitterAuthToken = process.env.TWITTER_AUTH_TOKEN;

if (!twitterAuthToken)
  throw new UserError(
    "bearer-token-not-provided",
    "Please ensure that you have a .env file containing a value for TWITTER_AUTH_TOKEN"
  );

const BEARER_TOKEN = "Bearer " + twitterAuthToken;
export { BEARER_TOKEN };
