const Env = require("dotenv");

Env.config();

// Inject the Twitter api endpoint from the environment
module.exports.TWITTER_API_URL = process.env.TWITTER_API_URL;

// Inject Twitter api key or token from the environment
module.exports.TWITTER_API_KEY = process.env.TWITTER_API_KEY;
