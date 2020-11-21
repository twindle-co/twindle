const { fetch } = require("../helpers/fetch");
const { getCommonFields, MAX_RESULTS } = require("../constants");

const BASE_ENDPOINT =
  "https://api.twitter.com/2/tweets/search/recent?query=from:<screen_name>+-is:retweet+-has:mentions";

/**
 * @param {string} screen_name
 */
const getUrl = (screen_name) => {
  let url = BASE_ENDPOINT;
  url = url.replace("<screen_name>", screen_name);

  const COMMON_FIELDS = getCommonFields();
  return `${url}${COMMON_FIELDS}${MAX_RESULTS}`;
};

/**
 * @param {string} id
 * @param {string} screenName
 * @param {string} token
 */
const getUserTweets = (screenName, token) => {
  const url = getUrl(screenName);
  return fetch(url, token);
};

module.exports = {
  getUserTweets,
};
