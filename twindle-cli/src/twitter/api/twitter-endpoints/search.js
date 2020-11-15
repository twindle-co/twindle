const { fetch } = require("../helpers/fetch");
const { getCommonFields, MAX_RESULTS } = require("../constants");
const { ApiErrors } = require("../../error");

const BASE_ENDPOINT =
  "https://api.twitter.com/2/tweets/search/recent?query=conversation_id:<conversation_id>+from:<screen_name>";

/**
 * @param {string} conversation_id
 * @param {string} screen_name
 */
const getUrl = (conversation_id, screen_name) => {
  let url = BASE_ENDPOINT;
  url = url.replace("<conversation_id>", conversation_id);
  url = url.replace("<screen_name>", screen_name);

  const COMMON_FIELDS = getCommonFields();
  return `${url}${COMMON_FIELDS}${MAX_RESULTS}`;
};

/**
 * @param {string} id
 * @param {string} screenName
 * @param {string} token
 */
const getConversationById = (id, screenName, token) => {
  if (!id) throw new ApiErrors.TweetIDNotProvidedError();

  const url = getUrl(id, screenName);
  return fetch(url, token);
};

module.exports = {
  getConversationById,
};
