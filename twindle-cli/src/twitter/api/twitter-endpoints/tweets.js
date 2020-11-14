const { fetch } = require("../helpers/fetch");
const { getCommonFields } = require("../constants");
const { ApiErrors } = require("../../error");

const BASE_ENDPOINT = "https://api.twitter.com/2/tweets?ids=";

/**
 * Get the tweet by the ID
 * @param {string} id tweet ID
 * @param {string} token Bearer token
 */
const getTweetById = (id, token) => {
  if (!id) throw new ApiErrors.TweetIDNotProvidedError();

  const COMMON_FIELDS = getCommonFields();
  const url = `${BASE_ENDPOINT}${id}${COMMON_FIELDS}`;

  return fetch(url, token);
};

module.exports = {
  getTweetById,
};
