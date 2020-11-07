const { fetch } = require("./helpers/fetch");
const { getCommonFields, MAX_RESULTS } = require("./constants");

const BASE_ENDPOINT =
  "https://api.twitter.com/2/tweets/search/recent?query=conversation_id:<conversation_id>+from:<screen_name>";

const getConversationById = (id, screenName, token) => {
  const url = getUrl(id, screenName);
  return fetch(url, token);
};

const getUrl = (conversation_id, screen_name) => {
  let url = BASE_ENDPOINT;
  url = url.replace("<conversation_id>", conversation_id);
  url = url.replace("<screen_name>", screen_name);

  const COMMON_FIELDS = getCommonFields();
  return `${url}${COMMON_FIELDS}${MAX_RESULTS}`;
};

module.exports = {
  getConversationById,
};
